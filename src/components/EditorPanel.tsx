/* eslint-disable no-fallthrough */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import RichEditorFrame from '~/modules/RichEditor/RichEditorFrame';
import { RichEditorDocument, RichEditorState, getToolbarConfigs } from '~/modules/RichEditor';

import documentDatas from '~/__datas__/documentDatas';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    background: '#fff',
    overflow: 'hidden',
    boxShadow: '0px 0px 5px 3px #ddd',
    borderRadius: '5px',
    margin: theme.spacing(0),
    height: '100%',
  },
}));

const EditorPanel: React.FC = () => {
  const classes = useStyles();
  const [richDoc, setRichDoc] = React.useState<RichEditorDocument>(new RichEditorDocument());
  const [richState, setRichState] = React.useState<RichEditorState>(
    RichEditorState.createEmptyState(),
  );

  const defaultLanguage = 'kr';

  /**
   * 툴바를 구성하기 위해 config 를 생성하는 방법
   *   1. configs.defaultToolbarConfig 를 참고하여 직접 config 객체를 만들어도 되고
   *   2. configs.getToolbarConfigs() 함수를 사용해 원하는 컨트롤들만 보이게 할 수도 있다.
  //  *   3. toolbarConfig 속성을 모든 툴바 컨트롤을 표시됩니다.
  //  */
  // const toolbarConfig = [
  //   {
  //     name: 'UndoRedo',
  //     type: 'BUTTONGROUP',
  //     buttons: [
  //       { label: 'Undo', value: 'undo', icon: 'undo_outlined' },
  //       { label: 'Redo', value: 'redo', icon: 'redo_outlined' },
  //     ],
  //   },
  // ];

  const toolbarConfig = getToolbarConfigs([
    'UndoRedo',
    'Divider',
    'HeadingStyle',
    'Divider',
    'BlockStyle',
    'Divider',
    'InlineStyle',
    'Divider',
    'Image',
    'Divider',
    'Extension',
  ]);

  /** 임시 샘플 데이터 로드
   * 왼쪽 목차 메뉴에서 노드를 선택할 경우 RichEditorRaw 타입의 데이터를 만들어서
   * new RichEditorDocument(raw) 로 생성하면 된다.
   */
  const loadSampleData = (id = '51') => {
    const docData = documentDatas.find((item) => {
      return item.id === id;
    });

    if (docData) {
      const doc = new RichEditorDocument(docData);
      setRichDoc(doc);

      const state = RichEditorState.createWithRichDocument(doc, defaultLanguage);
      setRichState(state);
    }
  };

  /**
   * RichEditor의 모든 이벤트를 Command로 처리할 예정.
   */
  const handleRichCommand = (command: string, value?: any) => {
    switch (command) {
      case 'save':
        console.log(value);
        break;
      case 'load':
        loadSampleData();
        break;
      case 'change-title':
        if (value) {
          // console.log(value.title);
          setRichDoc(value);
        }
      default:
        break;
    }
  };

  /** 사실 RichEditorState로 해야할 일을 Frame에 모두 포함할 예정이기 때문에
   * 밖에서는 특별히 처리할 내용이 없을 수도 있다.
   * 이 경우 onRichCommand evnet 에 모두 포함 시킬수도 있다.
   */
  const handleStateChange = (state: RichEditorState) => {
    setRichState(state);
  };

  return (
    <div className={classes.root}>
      <RichEditorFrame
        richDoc={richDoc}
        richState={richState}
        /** document 상태 변경 이벤트는 이것 하나로 통일 */
        onRichCommand={handleRichCommand}
        /** editor 상태 변경 이벤트 */
        onStateChange={handleStateChange}
        /** 이 값을 넘기기 않으면 모든 툴바를 표시합니다. */
        toolbarConfig={toolbarConfig}
      />
    </div>
  );
};

export default EditorPanel;
