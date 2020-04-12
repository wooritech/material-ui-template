import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  RawDraftContentState,
} from 'draft-js';

class EditorUtils {
  static editorStateToRaw = (richState: EditorState): RawDraftContentState => {
    const contentState = richState.getCurrentContent();
    return convertToRaw(contentState);
  };
}
export default EditorUtils;
