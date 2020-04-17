import * as Immutable from 'immutable';
import { EditorState, SelectionState, ContentBlock, Modifier } from 'draft-js';
import BlockUtils from './blockUtils';
import { RichEditorState } from '../modules';

class RealGridUtils {
  static insertGrid = (editorState: EditorState, data?: any) => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    let gridState = editorState;

    if (!BlockUtils.isEmptyBlock(content, selection))
      gridState = BlockUtils.splitBlock(editorState);

    const blockData = data || Immutable.Map();
    gridState = BlockUtils.insertNewFlagment(
      gridState,
      'before',
      'realgrid',
      '',
      blockData,
      // entityKey,
      // ' ',
    );

    return gridState;
  };

  /** */
  static removeGrid = (editorState: EditorState, block: ContentBlock) => {
    const blockKey = block.getKey();
    const content = editorState.getCurrentContent();

    /** forceSelection을 위해 selection을 다시 만든다. */
    const selection = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: block.getLength(),
    });

    const removedContent = Modifier.setBlockData(content, selection, Immutable.Map({}));
    const unstyledContent = Modifier.setBlockType(removedContent, selection, 'unstyled');
    const removedState = EditorState.push(editorState, unstyledContent, 'change-block-data');
    /** 이 state가 최종 state 여야 한다. */
    return EditorState.forceSelection(removedState, selection);
  };
}

export default RealGridUtils;
