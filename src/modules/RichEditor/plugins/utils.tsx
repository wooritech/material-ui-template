/* eslint-disable no-cond-assign */
import React from 'react';
import { Modifier, EditorState, DraftEntityMutability } from 'draft-js';
import { StrategyCallback } from './types';

/**
 * 현재위치에 { type, mutability, data } 엔터티를 추가한다.
 *
 * @param editorState
 * @param onChange
 * @param type
 * @param mutability
 * @param data
 */
export const setEntityAtSelection = (
  editorState: EditorState,
  onChange: React.Dispatch<React.SetStateAction<EditorState>>,
  type: string,
  mutability: DraftEntityMutability,
  data?: Record<string, any> | undefined,
) => {
  const contentstate = editorState.getCurrentContent();

  // Returns ContentState record updated to include the newly created DraftEntity record in it's EntityMap.
  let newContentState = contentstate.createEntity(type, mutability, data);

  // Call getLastCreatedEntityKey to get the key of the newly created DraftEntity record.
  const entityKey = contentstate.getLastCreatedEntityKey();

  // Get the current selection
  const selectionState = editorState.getSelection();

  // Add the created entity to the current selection, for a new contentState
  newContentState = Modifier.applyEntity(newContentState, selectionState, entityKey);

  // Add newContentState to the existing editorState, for a new editorState
  const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');

  onChange(newEditorState);
};

/**
 * 현재 위치의 entity 정보를 가져온다.
 *
 * @param editorState
 */
export const getEntityAtSelection = (editorState: EditorState) => {
  const selectionState = editorState.getSelection();
  const selectionKey = selectionState.getStartKey();
  const contentstate = editorState.getCurrentContent();

  // The block in which the selection starts
  const block = contentstate.getBlockForKey(selectionKey);

  // Entity key at the start selection
  const entityKey = block.getEntityAt(selectionState.getStartOffset());
  if (entityKey) {
    // The actual entity instance
    const entityInstance = contentstate.getEntity(entityKey);
    const entityInfo = {
      type: entityInstance.getType(),
      mutability: entityInstance.getMutability(),
      data: entityInstance.getData(),
    };
    return JSON.stringify(entityInfo, null, 4);
  }
  return 'No entity present at current selection!';
};

/**
 * regex 에 해당하는 블럭을 찾아서 callback 호출하면서 range정보 전송.
 * @param regex
 * @param callback
 */
export const findWithRegex = (regex: RegExp, findText: string, callback: StrategyCallback) => {
  let matchArr;
  let start;
  while ((matchArr = regex.exec(findText)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};
