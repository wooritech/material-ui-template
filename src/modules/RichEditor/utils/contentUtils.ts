/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, Modifier } from 'draft-js';
// @types 없음.
// import { setBlockData } from 'draftjs-utils';

class ContentUtils {
  static setBlockData = (editorState: EditorState, data: Immutable.Map<any, any>) => {
    const newContentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      data,
    );
    return EditorState.push(editorState, newContentState, 'change-block-data');
  };

  static getSelectionBlock = (editorState: EditorState) => {
    return editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getAnchorKey());
  };

  static getSelectionBlockData = (editorState: EditorState, name?: string) => {
    const blockData = ContentUtils.getSelectionBlock(editorState).getData();
    return name ? blockData.get(name) : blockData;
  };

  static setSelectionBlockData = (
    editorState: EditorState,
    blockData: Record<any, any>,
    override?: boolean,
  ) => {
    const newBlockData = override
      ? blockData
      : { ...ContentUtils.getSelectionBlockData(editorState).toJS(), ...blockData };

    Object.keys(newBlockData).forEach((key) => {
      if (newBlockData.hasOwnProperty(key) && newBlockData[key] === undefined) {
        delete newBlockData[key];
      }
    });
    // console.log(newBlockData);
    return ContentUtils.setBlockData(editorState, newBlockData);
  };

  static toggleSelectionAlignment = (editorState: EditorState, alignment: string | undefined) => {
    return ContentUtils.setSelectionBlockData(editorState, {
      textAlign:
        ContentUtils.getSelectionBlockData(editorState, 'textAlign') !== alignment
          ? alignment
          : undefined,
    });
  };
}

export default ContentUtils;
