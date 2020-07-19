/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { ContentBlock } from 'draft-js';
import RichEditorHeader from './RichEditorHeader';
import RichEditorToolbar from './RichEditorToolbar';
import { RichEditor, StatusBar } from './components';
import { RichEditorState, RichEditorDocument } from './modules';
import { ExtensionPanel, getExtension } from './extensions';
import { RichEditorConfig } from './configs';
import { EventRichCommand, TypeRichCommandValue } from './types';
import { blockStyleFn, richBlockRendererFn } from './renderers';
import { MediaUtils, TableUtils, EditorUtils, RealGridUtils, BlockUtils } from './utils';

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
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    /**
     * TODO: 스타일 수정 필요
     *  화면 크기에 따라 툴바의 높이가 변하면 전체 감싸고 있는 panel의 높이를 벗어남.
     */
    height: (props: { editorHeight: number }) => `calc(100vh - ${props.editorHeight}px)`,
  },
  extentions: {
    overflow: 'auto',
    paddingLeft: theme.spacing(1),
    borderLeft: '1px dashed #aaa',
    height: (props: { editorHeight: number }) => `calc(100vh - ${props.editorHeight}px)`,
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
  extLang: {
    color: '#0d0d0d',
    backgroundColor: '#e3f2fd',
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
  const [extensionValue, setExtensionValue] = React.useState<Record<any, any> | undefined>();

  /**
   * 멀티 랭기지 처리를 위해 editorState를 Frame 내부로 가져오고
   * mainState, subState 로 별개로 구성한다.
   */
  const [mainState, setMainState] = React.useState<RichEditorState>(
    RichEditorState.createWithRichDocument(richDoc, richConfig.defaultLanguage),
  );

  // const [customComponent, setCustomComponent] = React.useState<React.FC | undefined>(undefined);
  /**
  - [ ] FIXME 임시 */
  const saveDoc = (state: RichEditorState, lang: string) => {
    const raw = EditorUtils.editorStateToRaw(state);
    return { richDoc: richDoc.setRaw(raw, lang), lang };
  };

  /** 
    - [ ] TODO 나중에 컴포넌트 별로 분리 예정 */
  const handleRichCommand = (command: string, value?: TypeRichCommandValue) => {
    switch (command) {
      case 'save':
        onRichCommand(command, saveDoc(mainState, richConfig.currentLanguage));
        break;
      case 'change-state':
        setMainState(value);
        break;
      case 'change-custom-ext-mode':
        if (richConfig.isCustomExtension && value.mode === undefined) return;
        if (value.mode !== richConfig.extension) {
          // console.log('change-ext-mode', value, richConfig.extension);
          onConfigChange(richConfig.setExtension(value.mode));
        }
        setExtensionValue(value);
        break;
      /** 확장 패널 변경 명령 */
      case 'change-ext-mode':
        onConfigChange(richConfig.setExtension(value.mode));
        setExtensionValue(value);
        break;
      case 'change-language-mode':
        onConfigChange(richConfig.setExtension(value.mode).setCurrentLanguage(value.lang));
        /** 메인 편집기에서 선택된 언어를 편집하고 기본언어는 확장패널에서 읽기전용으로 보여준다. */
        setMainState(RichEditorState.createWithRichDocument(richDoc, value.lang));
        setExtensionValue({ richDoc, defaultLanguage: richConfig.defaultLanguage, ...value });
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
      case 'select-block':
        /** 선택된 블럭과 다르면 변경 */
        if (!BlockUtils.isCurrentBlock(mainState, value.block.getKey())) {
          setMainState(BlockUtils.selectBlock(mainState, value.block));
          // console.log('select-block:', value.block.getKey(), value.block.getType());
        }
        break;
      case 'remove-realgrid':
        handleRichCommand('change-state', RealGridUtils.removeGrid(mainState, value.block));
        break;
      default:
        onRichCommand(command, value);
    }
  };

  const handleMainStateChange = (state: RichEditorState) => {
    setMainState(state);
  };

  /** 블럭의 anchor 키가 변경될때 발생하는 이벤트  */
  const handleChangeBlock = (block: ContentBlock) => {
    const mode = getExtension(block, richConfig);
    handleRichCommand('change-custom-ext-mode', { mode, block });
  };

  return (
    <>
      <RichEditorHeader richDoc={richDoc} onRichCommand={handleRichCommand} />
      <Divider light />
      <RichEditorToolbar
        editorState={mainState}
        readOnly={readOnly}
        richConfig={richConfig}
        onRichCommand={handleRichCommand}
        onStateChange={handleMainStateChange}
      />
      <Divider light />
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={richConfig.extension === undefined ? 12 : 6}>
          <div className={classes.editor}>
            <RichEditor
              editorState={mainState}
              onChange={handleMainStateChange}
              blockRendererFn={richBlockRendererFn(handleRichCommand)}
              blockStyleFn={blockStyleFn}
              readOnly={readOnly}
              onChangeBlock={handleChangeBlock}
            />
          </div>
        </Grid>
        {richConfig.extension !== undefined ? (
          <>
            <Grid item xs={6}>
              <div className={classes.extentions}>
                <ExtensionPanel
                  extensionValue={extensionValue}
                  extensionType={richConfig.extension}
                  richState={mainState}
                  onStateChange={handleMainStateChange}
                />
              </div>
            </Grid>
          </>
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
