/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  RawDraftContentState,
} from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import LinkDecorator from '../decorators';
import RichEditorDocument from './RichEditorDocument';

const defaultRaw = {
  blocks: [
    {
      key: 'empty-key',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const defaultDecorators = new CompositeDecorator([LinkDecorator]);

/**
 * Draft.js 의 EditorState 확장
 *
 */
export default class RichEditorState extends EditorState {
  static createWithMarkdown = (markdown: string, options?: any) => {
    const raw = markdownToDraft(markdown, options);
    return RichEditorState.createWithRaw(raw);
  };

  static createWithRaw = (raw: any, decorators?: CompositeDecorator): EditorState => {
    const contentState = convertFromRaw(raw);
    return EditorState.createWithContent(contentState, decorators || defaultDecorators);
  };

  static createWithRichDocument = (doc: RichEditorDocument, language?: string): EditorState => {
    const lang = language || doc.defaultLanguage;
    const raw = doc.getRaw(lang) || defaultRaw;
    /** 문서에는 미리 정해진 language block만 가지고 있고
     * 새로운 언어 블럭을 추가할 때도 미리 정해진 언어만 추가할 수 있기 때문에 여기에서 오류가 날 경우는 뭔가 잘못된 경우다. */
    // if (!raw) throw new Error(`Don't have a '${language}' language block in this document.`);
    return RichEditorState.createWithRaw(raw);
  };

  static editorStateToRaw = (richState: RichEditorState): RawDraftContentState => {
    const contentState = richState.getCurrentContent();
    return convertToRaw(contentState);
  };

  static editorStateToRawString = (richState: RichEditorState): string => {
    if (!richState) return '';
    return JSON.stringify(RichEditorState.editorStateToRaw(richState), null, 2);
  };
}
