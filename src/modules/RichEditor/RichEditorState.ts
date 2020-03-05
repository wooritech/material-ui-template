import { EditorState, convertFromRaw, convertToRaw, CompositeDecorator } from 'draft-js';
import { createEmailPlugin, createUrlPlugin, createHashtagPlugin } from './plugins';

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
export class RichEditorState extends EditorState {
  public static editorStateToRow = (richState: RichEditorState): string => {
    if (!richState) return '';
    const contentState = richState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return JSON.stringify(raw, null, 2);
  };
}

export const createEmptyState = (decorators?: CompositeDecorator): EditorState => {
  return EditorState.createWithContent(emptyContentState, decorators || defaultDecorators);
};
