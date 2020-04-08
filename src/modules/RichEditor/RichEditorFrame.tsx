/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { SelectionState, Modifier } from 'draft-js';
import RichEditorHeader from './RichEditorHeader';
import RichEditorToolbar from './RichEditorToolbar';
import { RichEditor } from './components';
import { RichEditorState, RichEditorDocument } from './modules';
import { Preview, RawView, MultiLanguageEditor } from './extensions';
import { RichEditorConfig } from './configs';
import { EventRichCommand, TypeRichCommandValue } from './types';
import { blockStyleFn, richBlockRendererFn } from './renderers';
import { MediaUtils, ContentUtils, BlockUtils, TableUtils } from './utils';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  editor: {
    overflow: 'auto',
    fontSize: '16px',
    color: '#24292e',
    // backgroundColor: '#eee',
    // borderRadius: '3px',
    padding: '5px',
    /**
     * TODO: 스타일 수정 필요
     *  화면 크기에 따라 툴바의 높이가 변하면 전체 감싸고 있는 panel의 높이를 벗어남.
     */
    height: (props: { editorHeight: number }) => `calc(100vh - ${props.editorHeight}px)`,
  },
  extentions: {
    overflow: 'auto',
    height: (props: { editorHeight: number }) => `calc(100vh - ${props.editorHeight}px)`,
    borderRadius: '3px',
    padding: theme.spacing(1),
  },
  statusBar: {
    height: '40px',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: 'auto',
    overFlowY: 'none',
    fontSize: 12,
  },
  extRaw: {
    color: '#eee',
    fontSize: '1.3em',
    backgroundColor: '#0d0d0d',
  },
  extLang: {
    color: '#0d0d0d',
    backgroundColor: '#e3f2fd',
  },
  extPreview: {
    fontSize: '1.0em',
    border: '1px solid #d0d0d0',
  },
  divider: {
    backgroundColor: '#ddd',
    margin: theme.spacing(1),
  },
}));

interface RichEditorFrameProps {
  richDoc: RichEditorDocument;
  richState: RichEditorState;
  richConfig: RichEditorConfig;
  onRichCommand: EventRichCommand;
  onStateChange: (richState: RichEditorState) => void;
  onConfigChange?: (config: RichEditorConfig) => void;
  showStatusbar?: boolean;
}

/**
 * RichEditorFrame
 *
 */
const RichEditorFrame: React.FC<RichEditorFrameProps> = (props) => {
  const {
    richDoc,
    richState,
    richConfig,
    onRichCommand,
    onStateChange,
    onConfigChange,
    showStatusbar,
  } = props;
  const classes = useStyles({ editorHeight: showStatusbar ? 220 : 185 });
  const [status, setStatus] = React.useState<string[]>([]);
  const [readOnly, setReadOnly] = React.useState(false);

  const setStatusBar = (state: RichEditorState) => {
    const block = ContentUtils.getSelectionBlock(state).toJS();
    const inlineStyle = state.getCurrentInlineStyle();
    const outs: string[] = [];
    if (block.key) outs.push(block.key);
    if (block.type) outs.push(block.type);
    if (inlineStyle.count() > 0) outs.push(JSON.stringify(inlineStyle));
    outs.push(BlockUtils.isEmptyBlock(state.getCurrentContent(), state.getSelection()).toString());
    setStatus(outs);
  };

  const handleRichCommand = (command: string, value?: TypeRichCommandValue) => {
    switch (command) {
      case 'save':
        onRichCommand(command, RichEditorState.editorStateToRaw(richState));
        break;
      case 'change-state':
        onStateChange(value as RichEditorState);
        break;
      case 'change-ext-mode':
        if (onConfigChange) onConfigChange(richConfig.setExtension(value));
        break;
      case 'change-img-align':
        onStateChange(
          MediaUtils.setBlockImageAlign(richState, value.contentState, value.block, value.align),
        );
        break;
      case 'on-focus-table':
        /** 테이블 블럭에서 테이블에 포커스 올라가면 발생
         *  value = { contentState, block, data } */
        setReadOnly(true);
        break;
      case 'on-leave-table':
        /** 테이블 블럭에서 테이블에 포커스 사라지면 발생
         *  value = { contentState, block, data } */
        setReadOnly(false);
        onStateChange(
          TableUtils.setBlockTableData(richState, value.contentState, value.block, value.data),
        );
        break;
      default:
        onRichCommand(command, value);
    }
  };

  const handleStateChange = (state: RichEditorState) => {
    setStatusBar(state);
    // setBlockType(BlockUtils.getCurrentBlockType(state));
    // console.log(readOnly, blockType);
    // if (!readOnly && blockType === 'table') setReadOnly(true);
    // else setReadOnly(false);
    handleRichCommand('change-state', state);
  };

  return (
    <>
      <RichEditorHeader richDoc={richDoc} onRichCommand={handleRichCommand} />
      <Divider light />
      <RichEditorToolbar
        editorState={richState}
        richConfig={richConfig}
        onRichCommand={handleRichCommand}
        onStateChange={handleStateChange}
      />
      <Divider light />
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={richConfig.extension === undefined ? 12 : 6}>
          <div className={classes.editor}>
            <RichEditor
              editorState={richState}
              onChange={handleStateChange}
              blockRendererFn={richBlockRendererFn(handleRichCommand)}
              blockStyleFn={blockStyleFn}
              readOnly={readOnly}
            />
          </div>
        </Grid>
        {richConfig.extension === 'raw' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extRaw}`}>
              <RawView editorState={richState} />
            </div>
          </Grid>
        ) : null}
        {richConfig.extension === 'lang' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extLang}`}>
              <MultiLanguageEditor />
            </div>
          </Grid>
        ) : null}
        {['browser', 'html'].includes(richConfig.extension || '') ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extPreview}`}>
              <Preview view={richConfig.extension} editorState={richState} />
            </div>
          </Grid>
        ) : null}
      </Grid>
      <Divider light />
      <Grid container className={classes.statusBar} wrap="nowrap">
        <Grid item xs>
          <div>{status.join(' / ')}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default RichEditorFrame;
