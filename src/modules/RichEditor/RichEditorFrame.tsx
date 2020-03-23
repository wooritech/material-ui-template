/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MultiLanguageEditor from '~/modules/RichEditor/MultiLanguageEditor';
import RichEditor from './RichEditor';
import RichEditorState from './RichEditorState';
import RawViewer from './RawViewer';
import Preview from './Preview';
import RichEditorDocument from './RichEditorDocument';
import RichEditorHeader from './RichEditorHeader';
import RichEditorToolbar from './RichEditorToolbar';
import { RichEditorToolbarConfig, RichEditorConfig } from './configs';
import { EventRichCommand, TypeRichCommandValue, ToolbarState } from './types';

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
    height: 'calc(100vh - 185px)',
  },
  extentions: {
    overflow: 'auto',
    fontSize: '16px',
    height: 'calc(100vh - 185px)',
    borderRadius: '3px',
    padding: theme.spacing(1),
  },
  extRaw: {
    color: '#eee',
    backgroundColor: '#0d0d0d',
  },
  extLang: {
    color: '#0d0d0d',
    backgroundColor: '#e3f2fd',
  },
  extPreview: {
    backgroundColor: '#efefef',
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
  // toolbarConfig?: RichEditorToolbarConfig;
}

const RichEditorFrame: React.FC<RichEditorFrameProps> = (props) => {
  const classes = useStyles();
  const { richDoc, richState, richConfig, onRichCommand, onStateChange } = props;
  const [toolbarState, setToolbarState] = React.useState<ToolbarState>({ extension: undefined });

  const handleRichCommand = (command: string, value?: TypeRichCommandValue) => {
    switch (command) {
      case 'save':
        onRichCommand(command, RichEditorState.editorStateToRaw(richState));
        break;
      case 'change-state':
        onStateChange(value as RichEditorState);
        break;
      case 'change-ext-mode':
        // eslint-disable-next-line no-case-declarations
        const newState = { extension: value === toolbarState?.extension ? undefined : value };
        setToolbarState(newState);
        break;
      default:
        onRichCommand(command, value);
    }
  };

  const handleStateChange = (state: RichEditorState) => {
    handleRichCommand('change-state', state);
  };

  return (
    <>
      <RichEditorHeader richDoc={richDoc} onRichCommand={handleRichCommand} />
      <Divider light />
      <RichEditorToolbar
        editorState={richState}
        onRichCommand={handleRichCommand}
        onChange={handleStateChange}
        config={richConfig?.toolbarConfig}
        /** 임시 */
        toolbarState={toolbarState}
      />
      <Divider light />
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={toolbarState === null ? 12 : 6}>
          <div className={classes.editor}>
            <RichEditor editorState={richState} onChange={handleStateChange} />
          </div>
        </Grid>
        {toolbarState?.extension === 'raw' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extRaw}`}>
              <RawViewer editorState={richState} />
            </div>
          </Grid>
        ) : null}
        {toolbarState?.extension === 'lang' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extLang}`}>
              <MultiLanguageEditor />
            </div>
          </Grid>
        ) : null}
        {toolbarState?.extension === 'preview' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extPreview}`}>
              <Preview editorState={richState} />
            </div>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default RichEditorFrame;
