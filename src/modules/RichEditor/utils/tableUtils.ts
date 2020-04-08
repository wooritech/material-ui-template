import * as Immutable from 'immutable';
import {
  EditorState,
  AtomicBlockUtils,
  SelectionState,
  ContentState,
  ContentBlock,
  Modifier,
  genKey,
  Editor,
} from 'draft-js';
import BlockUtils from './blockUtils';
import { RichEditorState } from '../modules';
import ContentUtils from './contentUtils';

export const defaultTableData = {
  header: [{ text: '' }, { text: '' }, { text: '' }],
  body: [
    [{ text: '' }, { text: '' }, { text: '' }],
    [{ text: '' }, { text: '' }, { text: '' }],
  ],
  footer: [{ text: '' }, { text: '' }, { text: '' }],
};

export type TableData = typeof defaultTableData;

class TableUtils {
  /**
   * 선택된 위치에 테이블을 삽입
   * 테이블은 TableData 인자를 기반으로 생성하고 인자가 없으면 기본 테이블 생성
   *
   * selection의 위치([]) 또는 범위([..]에 따른 테이블 생성 위치 고민
   *
   * case-#1      case-#2       case-#3      case-#4      case-#5
   * -------------------------------------------------------------
   * []1234       1234[]        1234         1234         1234
   * 1234         1234          1[]234       1[23]4       1[234
   * 1234         1234          1234         1234         12]34
   *
   * result
   * -------------------------------------------------------------
   * <table>      1234          1234         1234         1234
   * 1234         <table>       1            1            1
   * 1234         1234          <table>      <table>      <table>
   * 1234         1234          234          4            34
   *                            1234         1234
   *
   * 루틴
   *  1. 현재 블럭이 text 가 없는 unstyled type 블럭이면 현재 블럭에 테이블 추가
   *  2. 현재 블럭에 text 가 있으면 split 한 다음 빈블럭을 찾아서 테이블 추가
   */
  static insertTable = (editorState: EditorState, data?: TableData) => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    let tableState = editorState;

    if (!BlockUtils.isEmptyBlock(content, selection))
      tableState = BlockUtils.splitBlock(editorState);

    // entity key 보다는 block data를 이용하는게 업데이트도 편하고 용도에 맞는것 같다.
    // const entityKey = TableUtils.createTableEntity(editorState, data || defaultTableData);
    const blockData = data || defaultTableData;
    tableState = BlockUtils.insertNewFlagment(
      tableState,
      'before',
      'table',
      '',
      blockData,
      // entityKey,
      // ' ',
    );

    return tableState;
  };

  /**
   * createTableEntity
   * 테이블 데이터를 Entity에 넣을 경우
   */
  static createTableEntity = (editorState: EditorState, data?: TableData) => {
    const contentState = editorState.getCurrentContent();

    /** 엔터티 추가 */
    const contentStateWithEntity = contentState.createEntity('TABLE', 'IMMUTABLE', data);

    return contentStateWithEntity.getLastCreatedEntityKey();
  };

  static setBlockTableData = (
    editorState: RichEditorState,
    contentState: ContentState,
    block: ContentBlock,
    data?: TableData,
  ): RichEditorState => {
    const blockData = block
      .getData()
      .set('header', data?.header)
      .set('body', data?.body)
      .set('footer', data?.footer);
    const selection = SelectionState.createEmpty(block.getKey());
    return EditorState.push(
      editorState,
      Modifier.mergeBlockData(contentState, selection, blockData),
      'change-block-data',
    );
    // return BlockUtils.setBlockData(editorState, contentState, selection, blockData);
    // return ContentUtils.setBlockData(editorState, blockData);
  };
}

export default TableUtils;
