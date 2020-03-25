import { EditorState, AtomicBlockUtils, Modifier } from 'draft-js';

class ContentUtils {
  static insertVideo = () => {
    return null;
  };

  static fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> | undefined => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = function(event: ProgressEvent<FileReader>) {
        resolve(event.target ? event.target.result : null);
      };

      reader.readAsDataURL(file);
    });
  };

  static insertImage = (editorState: EditorState, src: string, name?: string, size?: number) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {
      src,
      name,
      size,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  static insertImageUrl = (editorState: EditorState, url: string, name?: string, size?: number) => {
    return ContentUtils.insertImage(editorState, url, name, size);
  };

  static insertImageFile = async (editorState: EditorState, file: File) => {
    if (file.size > 0) {
      return ContentUtils.fileToBase64(file)?.then((base64) => {
        return ContentUtils.insertImage(editorState, base64 as string, file.name, file.size);
      });
    }
    return undefined;
  };
}

export default ContentUtils;
