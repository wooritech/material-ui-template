import { EditorState, AtomicBlockUtils } from 'draft-js';

export default {
  insertVideo: () => {
    return null;
  },

  // Convert file to base64 string
  fileToBase64: (filename: string, filepath: string) => {
    return new Promise((resolve) => {
      const file = new File([filename], filepath);
      const reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function(event: ProgressEvent<FileReader>) {
        resolve(event.target ? event.target.result : null);
      };

      // Convert data to base64
      reader.readAsDataURL(file);
    });
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
