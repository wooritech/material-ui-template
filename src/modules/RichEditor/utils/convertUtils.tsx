/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, RawDraftEntity } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { RichTableData } from '../components/RichTable';

/**
 * draft-convert에서 ContentBlock 타입을 다르게 구현하고 있다.
 *  - typescript 오류라고 봐야 하나?
 *  - @types/draft-convert 에서는 ContentBlock 으로 속성은 같은데 인스턴스된 값은 다르다.
 *  - getType() 과 같이 함수로 접근할 수 없다.
 */
const blockToHTML = (block: any) => {
  if (block.type === 'code-block') {
    return {
      start: '<pre>',
      end: '</pre>',
    };
  }

  if (block.type === 'atomic') {
    if (block.data) {
      return {
        start: `<div style="text-align: ${block.data.textAlign}">`,
        end: '</div>',
        empty: 'empty',
      };
    }
  }

  if (block.type === 'table') {
    /** block.data 는 순수한 js object로 넘어 온다. */
    // console.log('draft-convert talbe', block.data);
    const tableData = new RichTableData(block.data);
    return tableData.toHTML();
  }

  if (block.type === 'realgrid-demo') {
    return {
      start: `<div style='width: 100%'><iframe src="https://realgrid.com?q=${block.data.id}">`,
      end: '</iframe></div>',
      // empty: '',
    };
  }

  if (block.type === 'realgrid') {
    return {
      start: `<div><p>realgrid</>`,
      end: '</div>',
      // empty: '',
    };
  }

  return null;
};

const styleToHTML = (style: string) => {
  // console.log(style);
  if (style === 'BOLD') {
    /** 이 스타일은 그냥 연습일 뿐이다. */
    // return <span style={{ fontWeight: 800 }} />;
  }
  return null;
};

const entityToHTML = (entity: RawDraftEntity, originalText: string) => {
  const { type, data } = entity;
  if (type === 'image') {
    return <img src={data.src} alt="alt" />;
  }

  if (type === 'LINK') {
    return <a href={data.url}>{originalText}</a>;
  }
  return originalText;
};

class ConvertUtils {
  static insertVideo = () => {
    return null;
  };

  static convertToHTML = (editorState: EditorState): string => {
    return convertToHTML({
      blockToHTML,
      entityToHTML,
      styleToHTML,
    })(editorState.getCurrentContent());
  };
}

export default ConvertUtils;
