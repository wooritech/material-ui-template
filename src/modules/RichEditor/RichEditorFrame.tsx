/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import RichEditorHeader from './RichEditorHeader';
import RichEditorToolbar from './RichEditorToolbar';
import { RichEditor, StatusBar } from './components';
import { RichEditorState, RichEditorDocument } from './modules';
import { Preview, RawView } from './extensions';
import { RichEditorConfig } from './configs';
import { EventRichCommand, TypeRichCommandValue } from './types';
import { blockStyleFn, richBlockRendererFn } from './renderers';
import { MediaUtils, TableUtils, EditorUtils } from './utils';

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
    borderRadius: '3px',
    // padding: '5px',
    padding: theme.spacing(1),
    /**
     * TODO: 스타일 수정 필요
     *  화면 크기에 따라 툴바의 높이가 변하면 전체 감싸고 있는 panel의 높이를 벗어남.
     */
    height: (props: { editorHeight: number }) => `calc(100vh - ${props.editorHeight}px)`,
  },
  extentions: {
    overflow: 'auto',
    fontSize: '1.15em',
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
  richConfig: RichEditorConfig;
  onRichCommand: EventRichCommand;
  onConfigChange?: (config: RichEditorConfig) => void;
  showStatusbar?: boolean;
}

/**
 * RichEditorFrame
 *
 */
const RichEditorFrame: React.FC<RichEditorFrameProps> = (props) => {
  const { richDoc, richConfig, onRichCommand, onConfigChange, showStatusbar } = props;
  const classes = useStyles({ editorHeight: showStatusbar ? 220 : 185 });
  const [readOnly, setReadOnly] = React.useState(false);

  /**
   * 멀티 랭기지 처리를 위해 editorState를 Frame 내부로 가져오고
   * mainState, subState 로 별개로 구성한다.
   */
  const [mainState, setMainState] = React.useState<RichEditorState>(
    RichEditorState.createWithRichDocument(richDoc),
  );
  const [subState, setSubState] = React.useState<RichEditorState>(
    RichEditorState.createWithRichDocument(richDoc, 'en'),
  );

  /**
  - [ ] FIXME 임시 */
  const saveDoc = (lang?: string) => {
    const raw = EditorUtils.editorStateToRaw(mainState);
    return richDoc.setRaw(raw, lang || richDoc.defaultLanguage);
  };
  /** 
    - [ ] TODO 나중에 컴포넌트 별로 분리 우선 한군데 다 모아 보자. */
  const handleRichCommand = (command: string, value?: TypeRichCommandValue) => {
    switch (command) {
      case 'save':
        onRichCommand(command, saveDoc());
        break;
      case 'change-main-state':
        setMainState(value);
        break;
      case 'change-sub-state':
        setSubState(value);
        break;
      case 'change-ext-mode':
        if (onConfigChange) onConfigChange(richConfig.setExtension(value));
        break;
      case 'open-multi-lang':
        /**
         * - 다중 언어시 메인 에디터 상태는 readonly
        - [ ] TODO 다른언어 편집 창 열림 처리 
        - [ ] TODO 툴바 상태를 다른언어 편집창과 연결 */
        setReadOnly(true);
        setSubState(RichEditorState.createWithRichDocument(richDoc, 'en'));
        break;
      case 'close-multi-lang':
        /**
         * value는 lang id 가 넘어와야 한다.
        - [ ] TODO 다른언어 편집 창 닫힘 처리 */
        // setSubState(RichEditorState.createWithRichDocument(richDoc));
        saveDoc(value);
        break;
      case 'change-img-align':
        setMainState(
          MediaUtils.setBlockImageAlign(mainState, value.contentState, value.block, value.align),
        );
        break;
      case 'enter-table':
        /** 테이블 블럭에서 테이블에 포커스 올라가면 발생
         *  포커스가 내부 컴포넌트로 올라갈때 readonly 처리를 해주어야
         *  내부 컴포넌트의 키 동작이 유연하다. */
        setReadOnly(true);
        break;
      case 'change-table-data':
        setMainState(TableUtils.mergeBlockTableData(mainState, value.block, value.data));
        break;
      case 'leave-table':
        /** 테이블 블럭에서 테이블에 포커스 사라지면 발생 */
        setReadOnly(false);
        break;
      case 'remove-table':
        setMainState(TableUtils.removeTable(mainState, value.block));
        setReadOnly(false);
        break;
      default:
        onRichCommand(command, value);
    }
  };

  /** 
   - [x] editorState도 onRichCommand에서 처리 */
  // const handleStateChange = (state: RichEditorState) => {
  //   handleRichCommand('change-state', state);
  // };

  return (
    <>
      <RichEditorHeader richDoc={richDoc} onRichCommand={handleRichCommand} />
      <Divider light />
      <RichEditorToolbar
        editorState={mainState}
        richConfig={richConfig}
        onRichCommand={handleRichCommand}
        onStateChange={(state: RichEditorState) => handleRichCommand('change-main-state', state)}
      />
      <Divider light />
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={richConfig.extension === undefined ? 12 : 6}>
          <div className={classes.editor}>
            <RichEditor
              editorState={mainState}
              onChange={(state: RichEditorState) => handleRichCommand('change-main-state', state)}
              blockRendererFn={richBlockRendererFn(handleRichCommand)}
              blockStyleFn={blockStyleFn}
              readOnly={readOnly}
            />
          </div>
        </Grid>
        {richConfig.extension === 'raw' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extRaw}`}>
              <RawView editorState={mainState} />
            </div>
          </Grid>
        ) : null}
        {richConfig.extension === 'lang' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extLang}`}>
              <RichEditor
                editorState={subState}
                onChange={(state: RichEditorState) => handleRichCommand('change-sub-state', state)}
                blockRendererFn={richBlockRendererFn(handleRichCommand)}
                blockStyleFn={blockStyleFn}
                readOnly={readOnly}
              />
            </div>
          </Grid>
        ) : null}
        {['browser', 'html'].includes(richConfig.extension || '') ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extPreview}`}>
              <Preview view={richConfig.extension} editorState={mainState} />
            </div>
          </Grid>
        ) : null}
      </Grid>
      {showStatusbar ? (
        <>
          <Divider light />
          <Grid container className={classes.statusBar} wrap="nowrap">
            <Grid item xs>
              <StatusBar richState={mainState} />
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default RichEditorFrame;
