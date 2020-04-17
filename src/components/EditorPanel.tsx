/* eslint-disable no-fallthrough */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import RichEditorFrame from '~/modules/RichEditor/RichEditorFrame';
import { RichEditorDocument, RichEditorConfig, TypeRichCommandValue } from '~/modules/RichEditor';

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
  const [richDoc, setRichDoc] = React.useState<RichEditorDocument>(
    new RichEditorDocument(
      documentDatas.find((item) => {
        /** documentDatas 에서 불러올 id */
        /** 빈 문서 */
        // return item.id === '50';
        /** 복잡한 문서 */
        // return item.id === '51';
        /** 헤더 연습 */
        // return item.id === '52';
        /** 테이블 연습 */
        // return item.id === '53';
        /** 다중언어, 마크다운 연습 */
        // return item.id === '54';
        /** 리얼그리드 연습 */
        return item.id === '55';
      }),
    ),
  );

  /** 툴바 설정은 /modules/RichEditor/Readme.md 참조 */
  const [richConfig, setRichConfig] = React.useState<RichEditorConfig>(() => {
    const config = new RichEditorConfig();
    return config.setImageFileProcess('base64');
  });

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
  const handleRichCommand = (command: string, value?: TypeRichCommandValue) => {
    switch (command) {
      case 'save':
        /** 내용이 모두 저장된 RichDocuemnt 객체와 수정된 language 반환
         * - 리턴값 { richDoc: RichEditorDocument, lang: string }
         * - richDoc.toJS() 로 js 객체화 db에 저장 가능 형태로 변환.
         */
        console.log('rich command save', value, value.richDoc.toJS());
        setRichDoc(value.richDoc);
        break;
      case 'change-title':
        if (value) {
          // 타이틀이 변경된 RichDocument 객체를 돌려준다.
          // console.log(value.title);
          setRichDoc(value);
        }
        break;
      case 'insert-local-image':
        // 로컬PC에서 추가되는 이미지 파일 객체와 콜백 이벤트
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
  // const handleStateChange = (state: RichEditorState) => {
  //   setRichState(state);
  // };

  /**
   * 현재 버전으로 내부에서 config를 저장 하지 않는다.
   * - setRichConfig 반드시 필요
   * - 나중에는 저장 기능을 Frame에 넣을 예정.
   */
  const handleConfigChange = (config: RichEditorConfig) => {
    setRichConfig(config);
  };

  return (
    <div className={classes.root}>
      <RichEditorFrame
        richDoc={richDoc}
        richConfig={richConfig}
        /** document 상태 변경 이벤트는 이것 하나로 통일 */
        onRichCommand={handleRichCommand}
        /** config 변경 이벤트: 처리할 일은 없을것 같지만 */
        onConfigChange={handleConfigChange}
        /** 상태표시줄 표시 여부 */
        showStatusbar
      />
    </div>
  );
};

export default EditorPanel;
