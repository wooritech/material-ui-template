import { EditorState, AtomicBlockUtils } from 'draft-js';

export default {
  insertVideo: () => {
    return null;
  },

  insertImage: (editorState: EditorState, base64: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {
      src: base64,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  },
};
