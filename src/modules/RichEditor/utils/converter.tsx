/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, RawDraftEntity } from 'draft-js';
import { convertToHTML } from 'draft-convert';

/**
 * draft-convert에서 ContentBlock 타입을 다르게 구현하고 있다.
 *  - typescript 오류라고 봐야 하나?
 *  - @types/draft-convert 에서는 ContentBlock 으로 속성은 같은데 인스턴스된 값은 다르다.
 *  - getType() 과 같이 함수로 접근할 수 없다.
 */
const blockToHTML = (block: any) => {
  if (block.type === 'atomic') {
    // console.log(block);
    if (block.data) {
      return {
        start: `<div style="text-align: ${block.data.textAlign}">`,
        end: '</div>',
        empty: 'empty',
      };
    }
  }
  return null;
};

const styleToHTML = (style: string) => {
  // console.log(style);
  if (style === 'BOLD') {
    return <span style={{ color: 'blue' }} />;
  }
  return null;
};

const entityToHTML = (entity: RawDraftEntity, originalText: string) => {
  const { type, data } = entity;
  if (type === 'image') {
    return <img src={data.src} alt="alt" />;
  }
  return originalText;
};

export class Converter {
  static convertToHTML = (editorState: EditorState): string => {
    return convertToHTML({
      blockToHTML,
      entityToHTML,
      styleToHTML,
    })(editorState.getCurrentContent());
  };
}

export default Converter;
