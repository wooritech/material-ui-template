import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

class Converter {
  static convertToHTML = (editorState: EditorState): string => {
    return convertToHTML({})(editorState.getCurrentContent());
  };
}

export default Converter;
