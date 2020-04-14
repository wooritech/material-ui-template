/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  RawDraftContentState,
} from 'draft-js';
import { createEmailPlugin, createUrlPlugin, createHashtagPlugin } from '../plugins';
import RichEditorDocument from './RichEditorDocument';

// 에러 없이 초기 문서 생성을 위한 코드
const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      depth: 0,
      text: '',
      key: 'empty-key',
      type: 'unstyled',
      entityRanges: [],
      inlineStyleRanges: [],
    },
  ],
});

const emailPlugin = createEmailPlugin({});
const urlPlugin = createUrlPlugin({});
const hashtagPlugin = createHashtagPlugin({});
const defaultDecorators = new CompositeDecorator([
  emailPlugin.decorator,
  urlPlugin.decorator,
  hashtagPlugin.decorator,
]);

/**
 * Draft.js 의 EditorState 확장
 *
 */
export default class RichEditorState extends EditorState {
  static createEmptyState = (decorators?: CompositeDecorator): EditorState => {
    // console.log('RichEditorState.createEmptyState');
    return EditorState.createWithContent(emptyContentState, decorators || defaultDecorators);
  };

  static createWithRaw = (raw: any, decorators?: CompositeDecorator): EditorState => {
    const contentState = convertFromRaw(raw);
    return EditorState.createWithContent(contentState, decorators || defaultDecorators);
  };

  static createWithRichDocument = (doc: RichEditorDocument, language?: string): EditorState => {
    const defaultLanguage = language || doc.defaultLanguage;
    const raw = doc.getRaw(defaultLanguage);
    /** 문서에는 미리 정해진 language block만 가지고 있고
     * 새로운 언어 블럭을 추가할 때도 미리 정해진 언어만 추가할 수 있기 때문에 여기에서 오류가 날 경우는 뭔가 잘못된 경우다. */
    if (!raw) throw new Error(`Don't have a '${language}' language block in this document.`);
    return RichEditorState.createWithRaw(raw);
  };

  // static editorStateFromDoc = (doc: RichDocumentRaw, language = 'kr'): EditorState => {
  //   const state = RichEditorState.editorStateFromRaw(doc.lang.kr?.raw);
  //   return state;
  // };
  static editorStateToRaw = (richState: RichEditorState): RawDraftContentState => {
    const contentState = richState.getCurrentContent();
    return convertToRaw(contentState);
  };

  static editorStateToRawString = (richState: RichEditorState): string => {
    if (!richState) return '';
    return JSON.stringify(RichEditorState.editorStateToRaw(richState), null, 2);
  };

  // static editorStateFromRaw = (raw: any, decorators?: CompositeDecorator): EditorState => {
  //   const contentState = convertFromRaw(raw);
  //   return EditorState.createWithContent(contentState, decorators || defaultDecorators);
  // };
  // static editorStateFromDoc = (doc: RichDocumentRaw, language = 'kr'): EditorState => {
  //   const state = RichEditorState.editorStateFromRaw(doc.lang.kr?.raw);
  //   return state;
  // };
  // createWithEmpty() 오류로 createWithContext() 사용
  // static createEmptyState = (decorators?: CompositeDecorator): EditorState => {
  //   return EditorState.createWithContent(emptyContentState, decorators || defaultDecorators);
  // };
  // static createWithContent = (data: any, decorators?: CompositeDecorator): EditorState => {
  //   const contentState = convertFromRaw(data);
  //   return EditorState.createWithContent(contentState, decorators || defaultDecorators);
  // };
}
