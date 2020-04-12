import * as Immutable from 'immutable';
import { EditorState, SelectionState, ContentBlock, Modifier } from 'draft-js';
import BlockUtils from './blockUtils';
import { RichEditorState } from '../modules';
import { RichTableData } from '../components/RichTable';

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
  static insertTable = (editorState: EditorState, data?: RichTableData) => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    let tableState = editorState;

    if (!BlockUtils.isEmptyBlock(content, selection))
      tableState = BlockUtils.splitBlock(editorState);

    // entity key 보다는 block data를 이용하는게 업데이트도 편하고 용도에 맞는것 같다.
    // const entityKey = TableUtils.createTableEntity(editorState, data || defaultTableData);
    const blockData = data || new RichTableData();
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
  static createTableEntity = (editorState: EditorState, data?: RichTableData) => {
    const contentState = editorState.getCurrentContent();

    /** 엔터티 추가 */
    const contentStateWithEntity = contentState.createEntity('TABLE', 'IMMUTABLE', data);

    return contentStateWithEntity.getLastCreatedEntityKey();
  };

  /**
   * 테이블 블럭의 데이터를 지우고 상태를 unstyled로 바꾼다.
   * 블럭 자체를 삭제하지 않는다.
   */
  static removeTable = (editorState: EditorState, block: ContentBlock) => {
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

  /**
   * setBlockTableData
   * 전체 데이터를 다시 쓴다.
   */
  static setBlockTableData = (
    editorState: RichEditorState,
    block: ContentBlock,
    data?: RichTableData,
  ): RichEditorState => {
    const content = editorState.getCurrentContent();
    const selection = SelectionState.createEmpty(block.getKey());
    return EditorState.push(
      editorState,
      Modifier.setBlockData(content, selection, data || Immutable.Map()),
      'change-block-data',
    );
  };

  /**
   * mergeBlockTableData
   * 전체 데이터를 다시 쓸수는 없다.
   */
  static mergeBlockTableData = (
    editorState: RichEditorState,
    block: ContentBlock,
    data?: RichTableData,
  ): RichEditorState => {
    const content = editorState.getCurrentContent();
    const selection = SelectionState.createEmpty(block.getKey());
    return EditorState.push(
      editorState,
      Modifier.mergeBlockData(content, selection, data || Immutable.Map()),
      'change-block-data',
    );
  };
}

export default TableUtils;
