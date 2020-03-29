/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, Modifier, SelectionState, ContentState } from 'draft-js';

export const setBlockData = (
  editorState: EditorState,
  contentState: ContentState,
  selectionState: SelectionState,
  data: Immutable.Map<any, any>,
): EditorState => {
  const newContentState = Modifier.setBlockData(contentState, selectionState, data);
  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export const setSelectedBlockData = (
  editorState: EditorState,
  data: Immutable.Map<any, any>,
): EditorState => {
  return setBlockData(
    editorState,
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data,
  );
};
