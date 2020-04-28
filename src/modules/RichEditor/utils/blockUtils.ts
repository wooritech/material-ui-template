/* eslint-disable no-unused-expressions */
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
  RichUtils,
} from 'draft-js';

class BlockUtils {
  /**
   *
   */
  static getCurrentBlockType = (editorState: EditorState): string => {
    return RichUtils.getCurrentBlockType(editorState);
  };

  static isCurrentBlock = (editorState: EditorState, block: ContentBlock | string): boolean => {
    const content = editorState.getCurrentContent();
    const currentBlock = BlockUtils.getCurrentAnchorBlock(editorState);
    const targetBlock = typeof block === 'string' ? content.getBlockForKey(block) : block;
    return currentBlock.getKey() === targetBlock.getKey();
  };

  /** key 블럭의 block type */
  static getBlockType = (editorState: EditorState, key: string): string => {
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(key);

    return block?.getType();
  };

  /** selection의 anchor key 블럭 반환 */
  static getCurrentAnchorBlock = (editorState: EditorState): ContentBlock => {
    const selection = editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = editorState.getCurrentContent();

    return contentState.getBlockForKey(anchorKey);
  };

  /** 서로 다른 블럭인가? */
  static diffBlock = (block1: ContentBlock, block2: ContentBlock): boolean => {
    return block1.getKey() !== block2.getKey();
  };

  /** 블럭 선택 */
  static selectBlock = (editorState: EditorState, block: ContentBlock): EditorState => {
    // const editorState = getEditorState();

    // TODO verify that always a key-0-0 exists
    // const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
    const offsetKey = `${block.getKey()}-${0}-${0}`;
    const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
    // set the native selection to the node so the caret is not in the text and
    // the selectionState matches the native selection
    // window range 객체에 derecate 되는 함수가 있는데 괜찮은가 모르겠다.
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 0);
    selection?.removeAllRanges();
    selection?.addRange(range);
    // console.log(node, selection, range);

    return EditorState.forceSelection(
      editorState,
      new SelectionState({
        anchorKey: block.getKey(),
        anchorOffset: 0,
        focusKey: block.getKey(),
        focusOffset: 0,
        isBackward: false,
      }),
    );
  };

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
