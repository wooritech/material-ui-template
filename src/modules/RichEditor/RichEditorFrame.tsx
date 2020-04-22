/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import RichEditorHeader from './RichEditorHeader';
import RichEditorToolbar from './RichEditorToolbar';
import { RichEditor, StatusBar } from './components';
import { RichEditorState, RichEditorDocument } from './modules';
import { Preview, RawView, Markdown } from './extensions';
import { RichEditorConfig } from './configs';
import { EventRichCommand, TypeRichCommandValue } from './types';
import { blockStyleFn, richBlockRendererFn } from './renderers';
import { MediaUtils, TableUtils, EditorUtils, RealGridUtils } from './utils';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    padding: theme.spacing(1),
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
  extCustom: {
    borderLeft: '1px dashed #aaa',
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
  extMarkdown: {
    // type LineStyle = "dashed" | "dotted" | "double" | "groove" | "hidden" | "inset" | "none" | "outset" | "ridge" | "solid";
    borderLeft: '1px dashed #aaa',
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
  onConfigChange: (config: RichEditorConfig) => void;
  showStatusbar?: boolean;
}

/**
 * RichEditorFrame
 *
 */
const RichEditorFrame: React.FC<RichEditorFrameProps> = (props) => {
  const { richDoc, richConfig, onRichCommand, onConfigChange, showStatusbar } = props;
  const classes = useStyles({ editorHeight: showStatusbar ? 198 : 163 });
  const [readOnly, setReadOnly] = React.useState(false);

  /**
   * 멀티 랭기지 처리를 위해 editorState를 Frame 내부로 가져오고
   * mainState, subState 로 별개로 구성한다.
   */
  const [mainState, setMainState] = React.useState<RichEditorState>(
    RichEditorState.createWithRichDocument(richDoc, richConfig.defaultLanguage),
  );
  const [subState, setSubState] = React.useState<RichEditorState>(RichEditorState.createEmpty());

  const [customComponent, setCustomComponent] = React.useState<React.FC | undefined>(undefined);
  /**
  - [ ] FIXME 임시 */
  const saveDoc = (state: RichEditorState, lang: string) => {
    const raw = EditorUtils.editorStateToRaw(state);
    return { richDoc: richDoc.setRaw(raw, lang), lang };
  };

  const isEditingLanguage = () => {
    return (
      richConfig.extension === 'lang' && richConfig.defaultLanguage !== richConfig.currentLanguage
    );
  };

  const getCurrentState = (): RichEditorState => {
    // 다른언어 편집중인지 확인
    if (isEditingLanguage()) return subState;

    // 다른언어 편집중이 아니면
    return mainState;
  };

  /** 
    - [ ] TODO 나중에 컴포넌트 별로 분리 우선 한군데 다 모아 보자. */
  const handleRichCommand = (command: string, value?: TypeRichCommandValue) => {
    switch (command) {
      case 'save':
        onRichCommand(command, saveDoc(mainState, richConfig.defaultLanguage));
        break;
      case 'change-main-state':
        setMainState(value);
        break;
      case 'change-state':
        if (isEditingLanguage()) setSubState(value);
        else setMainState(value);
        break;
      case 'change-sub-state':
        setSubState(value);
        break;
      case 'change-ext-mode':
        // 다중언어 편집중이면 편집중인 문서 저장 하고 default 상태로 돌려야 한다.
        if (richConfig.extension === 'lang') {
          handleRichCommand('close-editing-language');
        }

        onConfigChange(richConfig.setExtension(value));
        break;
      case 'close-multi-lang':
        /**
         * value는 lang id 가 넘어와야 한다.
        - [ ] TODO 다른언어 편집 창 닫힘 처리 */
        // setSubState(RichEditorState.createWithRichDocument(richDoc));
        setReadOnly(false);
        // saveDoc(value);
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
      case 'open-editing-language':
        /**
         * 현재 다중언어 편집중이 아니고 다중언어 편집상태로 된다면?
         *   - 메인 편집기를 readonly로
         *   - 서브 편집기의 editorState를 richDoc 해당 언어의 문서를 가져와서 생성
         *   - 다중언어 편집창 열기
         *   - 기본언어를 선택하면 여기로 들어오면 안된다.
         */
        console.log(command);
        setReadOnly(true);

        onConfigChange(richConfig.setExtension('lang').setCurrentLanguage(value));
        setSubState(RichEditorState.createWithRichDocument(richDoc, value));
        break;
      case 'change-editing-language':
        /**
         * 현재 다중언어 편집중이고 다중언어 편집상태로 된다면?
         *   - 메인 편집기를 readonly로 유지
         *   - 서브 편집기의 editorState를 richDoc 해당 언어의 문서를 가져와서 생성
         *   - 다중언어 편집창 유지
         *   - 기본언어를 선택하면 여기로 들어오면 안된다.
         *   - 기존에 편집중인 문서는 저장.
         */
        console.log(command);
        // 이미 다른 언어를 편집중이었다면
        if (richConfig.extension === 'lang')
          onRichCommand('save', saveDoc(subState, richConfig.currentLanguage));

        setReadOnly(true);

        onConfigChange(richConfig.setExtension('lang').setCurrentLanguage(value));
        setSubState(RichEditorState.createWithRichDocument(richDoc, value));
        break;
      case 'close-editing-language':
        /**
         * 현재 다중언어 편집중이고 기본언어를 선택 했다면?
         *   - 편집중인 언어를 문서에 저장하고
         *   - 다중언어 편집창을 닫는다.
         *   - 기본언어 편집기 readonly 풀어준다.
         */
        console.log(command);
        onRichCommand('save', saveDoc(subState, richConfig.currentLanguage));

        onConfigChange(
          richConfig.setExtension(undefined).setCurrentLanguage(richConfig.defaultLanguage),
        );
        setReadOnly(false);
        break;
      // case 'open-custom-extension':
      //   onConfigChange(richConfig.setExtension('custom'));
      //   setCustomComponent(value.component);
      //   break;
      // case 'close-custom-extension':
      //   onConfigChange(richConfig.setExtension(undefined));
      //   setCustomComponent(undefined);
      //   break;
      case 'remove-realgrid':
        handleRichCommand('change-state', RealGridUtils.removeGrid(getCurrentState(), value.block));
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

  const handleToolbarStateChange = (state: RichEditorState) => {
    const command = isEditingLanguage() ? 'change-sub-state' : 'change-main-state';
    handleRichCommand(command, state);
  };

  return (
    <>
      <RichEditorHeader richDoc={richDoc} onRichCommand={handleRichCommand} />
      <Divider light />
      <RichEditorToolbar
        editorState={getCurrentState()}
        readOnly={readOnly}
        richConfig={richConfig}
        onRichCommand={handleRichCommand}
        onStateChange={handleToolbarStateChange}
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
        {richConfig.extension === 'markdown' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extMarkdown}`}>
              <Markdown
                editorState={mainState}
                onStateChange={(state: RichEditorState) =>
                  handleRichCommand('change-main-state', state)
                }
              />
            </div>
          </Grid>
        ) : null}
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
                readOnly={false}
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
        {/* {richConfig.extension === 'custom'
          ? () => {
              // custom extension 은 생각해야 할게 너무 많다.
              const customExtRef = React.useRef<HTMLInputElement | null>(null);
              // if (!customExtRef) customExtRef.current.focus();
              console.log(customExtRef);
              const handleOnBlur = () => {
                onRichCommand('close-custom-extension');
              };
              return (
                <Grid item xs={6}>
                  <div
                    onBlur={handleOnBlur}
                    className={`${classes.extentions} ${classes.extCustom}`}
                  >
                    <input ref={customExtRef} type="text" />
                    {customComponent}
                  </div>
                </Grid>
              );
            }
          : null} */}
      </Grid>
      {showStatusbar ? (
        <>
          <Divider light />
          <Grid container className={classes.statusBar} wrap="nowrap">
            <Grid item xs>
              <StatusBar richState={getCurrentState()} />
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default RichEditorFrame;
