/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, AtomicBlockUtils, Modifier } from 'draft-js';
// @types 없음.
// import { setBlockData } from 'draftjs-utils';

export function setBlockData(editorState: EditorState, data: Immutable.Map<any, any>) {
  const newContentState = Modifier.setBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data,
  );
  return EditorState.push(editorState, newContentState, 'change-block-data');
}

export const getSelectionBlock = (editorState: EditorState) => {
  return editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey());
};

export const getSelectionBlockData = (editorState: EditorState, name?: string) => {
  const blockData = getSelectionBlock(editorState).getData();
  return name ? blockData.get(name) : blockData;
};

export const setSelectionBlockData = (
  editorState: EditorState,
  blockData: Record<any, any>,
  override?: boolean,
) => {
  const newBlockData = override
    ? blockData
    : { ...getSelectionBlockData(editorState).toJS(), ...blockData };

  Object.keys(newBlockData).forEach((key) => {
    if (newBlockData.hasOwnProperty(key) && newBlockData[key] === undefined) {
      delete newBlockData[key];
    }
  });

  return setBlockData(editorState, newBlockData);
};

export const toggleSelectionAlignment = (
  editorState: EditorState,
  alignment: string | undefined,
) => {
  return setSelectionBlockData(editorState, {
    textAlign:
      getSelectionBlockData(editorState, 'textAlign') !== alignment ? alignment : undefined,
  });
};
