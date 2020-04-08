/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Immutable from 'immutable';
import {
  EditorState,
  Modifier,
  SelectionState,
  ContentState,
  ContentBlock,
  CharacterMetadata,
  genKey,
} from 'draft-js';

class BlockUtils {
  /**
   * 블럭 분리
   */
  static splitBlock = (editorState: EditorState): EditorState => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const splited = Modifier.splitBlock(content, selection);
    return EditorState.push(editorState, splited, 'split-block');
  };

  /**
   * isEmptyBlockByKey
   */
  static isEmptyBlockByKey = (content: ContentState, blockKey: string): boolean => {
    const block = content.getBlockForKey(blockKey);
    return block.getText() === '' && block.getType() === 'unstyled';
  };

  /**
   * 현재 selection의 actorBlock을 기준으로 빈블럭 체크
   * checkBlock이 false이면 범위선택만 아니면 true 반환
   */
  static isEmptyBlock = (content: ContentState, selection: SelectionState, checkBlock = true) => {
    return (
      selection.getAnchorKey() === selection.getEndKey() &&
      selection.getAnchorOffset() === selection.getEndOffset() &&
      (checkBlock ? BlockUtils.isEmptyBlockByKey(content, selection.getAnchorKey()) : true)
    );
  };

  /**
   * 끝에 추가된다.
   */
  static insertNewBlock = (editorState: EditorState): EditorState => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockMap = content.getBlockMap();
    const newBlock = new ContentBlock({
      key: genKey(),
      text: '',
      type: 'unstyled',
    });

    const newBlockMap = blockMap
      .toSeq()
      .concat([[newBlock.getKey(), newBlock]])
      .toOrderedMap();

    const newContent =
      content.merge({
        blockMap: newBlockMap,
        selectionBefore: SelectionState.createEmpty('empty-key'),
        selectionAfter: selection,
      }) as ContentState;

    return EditorState.push(editorState, newContent, 'change-block-data');
  };

  /**
   * 현재 selection위치에 블럭을 추가한다.
   */
  static insertNewFlagment = (
    editorState: EditorState,
    direction: 'before' | 'after',
    type: string,
    text: string,
    blockData?: any,
    entityKey?: string,
    character?: string,
  ) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const currentBlock = contentState.getBlockForKey(selection.getEndKey());

    const blockMap = contentState.getBlockMap();

    // Split the blocks
    const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
      return v === currentBlock;
    });

    const blocksAfter = blockMap
      .toSeq()
      .skipUntil(function (v) {
        return v === currentBlock;
      })
      .rest();

    const newBlockKey = genKey();
    // blockData가 있으면
    const data = blockData ? Immutable.Map(blockData) : Immutable.Map();
    // entityKey와 char이 있어야 entityData를 추가한다.
    const charData = CharacterMetadata.create({
      entity: entityKey,
    });
    const characterList =
      entityKey && character
        ? Immutable.List(Immutable.Repeat(charData, character.length))
        : Immutable.List();

    const newBlock = new ContentBlock({
      key: newBlockKey,
      type: type || 'unstyled',
      text,
      data,
      characterList,
    });

    const newBlocks =
      direction === 'before'
        ? [
            [newBlockKey, newBlock],
            [currentBlock.getKey(), currentBlock],
          ]
        : [
            [currentBlock.getKey(), currentBlock],
            [newBlockKey, newBlock],
          ];
    const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap();
    const newContentState =
      contentState.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,
        selectionAfter: selection,
      }) as ContentState;
    return EditorState.push(editorState, newContentState, 'insert-fragment');
  };

  /**
   *
   */
  static setBlockData = (
    editorState: EditorState,
    contentState: ContentState,
    selectionState: SelectionState,
    data: Immutable.Map<any, any>,
  ): EditorState => {
    const newContentState = Modifier.setBlockData(contentState, selectionState, data);
    return EditorState.push(editorState, newContentState, 'change-block-data');
  };

  /**
   *
   */
  static setSelectedBlockData = (
    editorState: EditorState,
    data: Immutable.Map<any, any>,
  ): EditorState => {
    return BlockUtils.setBlockData(
      editorState,
      editorState.getCurrentContent(),
      editorState.getSelection(),
      data,
    );
  };
}

export default BlockUtils;
