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

export const defaultTableData = {
  headers: [{ text: 'Header 1' }, { text: 'Header 2' }, { text: 'Header 3' }, { text: 'Header 4' }],
  rows: [
    [
      { text: 'Col 1, Row 1' },
      { text: 'Col 2, Row 1' },
      { text: 'Col 3, Row 1' },
      { text: 'Col 4, Row 1' },
    ],
    [
      { text: 'Col 1, Row 2' },
      { text: 'Col 2, Row 2' },
      { text: 'Col 3, Row 2' },
      { text: 'Col 4, Row 2' },
    ],
    [
      { text: 'Col 1, Row 3' },
      { text: 'Col 2, Row 3' },
      { text: 'Col 3, Row 3' },
      { text: 'Col 4, Row 3' },
    ],
  ],
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

    const entityKey = TableUtils.createTableEntity(editorState, data || defaultTableData);
    const blockData = data || defaultTableData;
    tableState = BlockUtils.insertNewFlagment(
      tableState,
      'before',
      'table',
      '',
      blockData,
      entityKey,
      ' ',
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
}

export default TableUtils;
