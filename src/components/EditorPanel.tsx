/* eslint-disable no-fallthrough */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import RichEditorFrame from '~/modules/RichEditor/RichEditorFrame';
import {
  RichEditorDocument,
  RichEditorState,
  // getToolbarConfigs,
  RichEditorConfig,
} from '~/modules/RichEditor';

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

  /**
   * Config: RichEditorConfig
   * 에디터를 구성하기 위한 설정 값을 넘겨주기 위한 클래스
   *
   * 기본설정
   * new RichEditorConfig() 로 기본 설정을 생성해서
   *
   * 툴바를 구성하기 위해 config 를 생성하는 방법
   *   1. configs.defaultToolbarConfig 를 참고하여 직접 config 객체를 만들어도 되고
   *   2. configs.getToolbarConfigs() 함수를 사용해 원하는 컨트롤들만 보이게 할 수도 있다.
   *      getToolbarConfigs([
   *         'UndoRedo',
   *         'Divider',
   *         'HeadingStyle',
   *         'Divider',
   *         'BlockStyle',
   *         'Divider',
   *         'InlineStyle',
   *         'Divider',
   *         'Image',
   *         'Table',
   *         'CodeDirector',
   *         'Divider',
   *         'Extension',
   *       ]),
   *   3. toolbarConfig 속성을 이용해 툴바 직접 구성
   *       const toolbarConfig = [
   *         {
   *           name: 'UndoRedo',
   *           type: 'BUTTONGROUP',
   *           buttons: [
   *             { label: 'Undo', value: 'undo', icon: 'undo_outlined' },
   *             { label: 'Redo', value: 'redo', icon: 'redo_outlined' },
   *           ],
   *         },
   *       ];
   */
  const [richConfig, setRichConfig] = React.useState<RichEditorConfig>(() => {
    const config = new RichEditorConfig();
    return config.setImageFileProcess('base64');
  });

  const defaultLanguage = 'kr';

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

  /** config.image.fileProcess 'upload-url' 타입 처리 */
  const uploadImageFile = (value: {
    file: File;
    callbackFn: (src: string, name?: string, size?: number) => void;
  }) => {
    const { file, callbackFn } = value;
    if (file) {
      console.log(file.name, file.size);
      /** 이미지 업로드 후 콜백함수 호출 */
      setTimeout(() => {
        const url = 'https://t1.daumcdn.net/cfile/tistory/234A8049559BCC8D33';
        callbackFn(url, file.name, file.size);
      }, 3000);
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
        break;
      case 'change-state':
        /** onStateChange 와 동일한 효과. */
        setRichState(value as RichEditorState);
        break;
      case 'insert-local-image':
        uploadImageFile(value);
        break;
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

  /**
   * 내부에서 config를 변경하고 핸들링 할 일이 뭐가 있을까?
   */
  const handleConfigChange = (config: RichEditorConfig) => {
    setRichConfig(config);
  };

  return (
    <div className={classes.root}>
      <RichEditorFrame
        richDoc={richDoc}
        richState={richState}
        richConfig={richConfig}
        /** document 상태 변경 이벤트는 이것 하나로 통일 */
        onRichCommand={handleRichCommand}
        /** editor 상태 변경 이벤트 */
        onStateChange={handleStateChange}
        /** config 변경 이벤트: 처리할 일은 없을것 같지만 */
        onConfigChange={handleConfigChange}
        /** 이 값을 넘기기 않으면 모든 툴바를 표시합니다. */
        // toolbarConfig={toolbarConfig}
        /** 상태표시줄 표시 여부 */
        showStatusbar
      />
    </div>
  );
};

export default EditorPanel;
