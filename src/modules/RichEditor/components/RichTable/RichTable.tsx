import * as Immutable from 'immutable';
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { BlockComponentProps } from '../types';
import RichTableData, { defaultTableData } from './RichTableData';
import { TableCell } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  toolbar: {
    marginTop: '8px',
    backgroundColor: '#fff',
  },
  table: {
    width: '100%',
    border: '1px dashed',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  th: {
    backgroundColor: '#eee',
    border: '1px dashed',
    textAlign: 'center',
  },
  td: {
    border: '1px dashed',
  },
  tf: {
    backgroundColor: '#eee',
    border: '1px dashed',
  },
  tdInput: {
    padding: theme.spacing(1),
  },
}));

/**
 * RichTable
 *
 * - 테이블 블럭의 데이터를 기반으로 테이블 랜더링
 * - 행, 컬럼 추가, 삭제
 * - 테이블의 내용 편집
 * - 테이블 삭제
 */
const RichTable: React.FC<BlockComponentProps> = (props) => {
  const { block, blockProps } = props;
  const [current, setCurrent] = React.useState(
    Immutable.Map({
      isFocused: false,
      type: '',
      row: -1,
      col: -1,
      text: '',
    }),
  );
  const classes = useStyles();
  const blockKey = block.getKey();

  /** 랜더링은 js 객체로 하고 데이터 처리는 immutable class로 한다. */
  const blockData = block.getData().size === 0 ? defaultTableData : block.getData().toJS();
  const tableDataObject = new RichTableData(blockData);
  /**
   - [ ] FIXME: RichTableData의 구조적 문제
   * 데이터가 있는 경우와 없는 경우 어떤 차이에 의해 달리지는지 알아내야 한다.
   * defaultTableData도 immutalbe.map()으로 처리해서 넣었지만 여전히 차이는 있다.
   * _tails에 값이 있고 없고 차이가 생기는데 정확한 이유는 알수 없고, 동작에는 문제가 없다.
   * 즉,
   *  저장된 block에서 불러온 data로 만든 클래스에는 _tails에 값이 들어가고,
   *  default로 만든 클래스에는 값이 들어가지 않는다.
   */
  // console.log(blockKey, blockData, tableDataObject);

  const tableData = tableDataObject.toJS();

  /** 현재 테이블 블럭의 셀간 이동인지 확인 */
  const isRelatedFocusing = (element: EventTarget | null) => {
    if (element) {
      const targetKey = (element as Element).getAttribute('aria-label');
      return targetKey === blockKey;
    }
    return false;
  };

  /** 포커스가 이 테이블에 들어올때 발생 */
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    const fType = event.type;

    /** 셀 간 이동시 테이블 focus 이벤트는 보류 */
    if (isRelatedFocusing(event.relatedTarget)) return;

    const onCompleteReadonly = () => {
      blockProps.onRichCommand('enter-table', { block });
    };

    if (fType === 'focus') {
      console.log(`<< enter-table: (${blockKey})`);
      blockProps.onRichCommand('select-block', { block });
      /**
       * setTimeout() 사용한 이유
       *   블럭선택 -> onChangeBlock 이벤트 -> readonly(true) 의 순으로 되어야 하는데 sync가 안 맞는다
       *   그래도 state 의 chnage는 stack 구조여서 readonly 가 풀리면 onChangeBlock 이벤트가 발생한다.
       *   즉, 블럭선택 -> readonly(true) ... readonly(false) -> onChangeBlock 이 된다.
       *
       * 이게 정확한 문제 해결이 안된다. 20200428
       */
      setTimeout(() => {
        blockProps.onRichCommand('enter-table', { block });
      }, 100);

      setCurrent(current.set('isFocused', true));
    }

    if (fType === 'blur') {
      console.log(`(${blockKey}) :leave-table >>`);
      blockProps.onRichCommand('leave-table');
      setCurrent(current.set('isFocused', false));
    }
  };

  /** header의 contentEditable에 의해 생성된 input을 벗어날때 이벤트
   * onChange이벤트, onInput이벤트등을 이용할 수도 있다. */
  const handleHeaderChange = (event: React.FocusEvent, index: number) => {
    const text = event.currentTarget.textContent || '';
    const data = tableDataObject.setHeaderCell(index, text);
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /** footer input을 벗어날때 이벤트 */
  const handleFooterChange = (event: React.FocusEvent, index: number) => {
    const text = event.currentTarget.textContent || '';
    const data = tableDataObject.setFooterCell(index, text);
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /** 셀 선택 될때 current 정보 유지 */
  const handleEnterCell = (
    e: React.FocusEvent,
    type: string,
    row: number,
    col: number,
    text: string,
  ) => {
    /**
     - [ ] FIXME handleFocus()와의 시간차 문제를 해결하고 setTimeout을 제거해야 한다.
     문제는 처음 포커스가 올라올때 나중에 초기화 되는 문제 */
    setTimeout(() => {
      const newCurrent = current
        .set('isFocused', true)
        .set('type', type)
        .set('row', row)
        .set('col', col)
        .set('text', text);
      // console.log(newCurrent.toJS());
      setCurrent(newCurrent);
    }, 20);
  };

  /** cell input을 벗어날때 이벤트 */
  const handleCellChange = (event: React.FocusEvent, rowIndex: number, colIndex: number) => {
    const text = event.currentTarget.textContent || '';
    const data = tableDataObject.setBodyCell(rowIndex, colIndex, text);
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /** 헤더 추가 */
  const handleInsertHeaderClick = (event: React.MouseEvent) => {
    const data = tableDataObject.insertHeader();
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /** 풋터 추가 */
  const handleInsertFooterClick = (event: React.MouseEvent) => {
    const data = tableDataObject.insertFooter();
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /**
   * 컬럼 추가
   * - 현재 컬럼 index에 새 컬럼 추가 */
  const handleInsertColumnClick = (event: React.MouseEvent) => {
    const col = Number(current.get('col'));
    if (col > -1) {
      const data = tableDataObject.insertColumn(col);
      blockProps.onRichCommand('change-table-data', { block, data });
    }
  };

  /** 컬럼 삭제 */
  const handleRemoveColumnClick = (event: React.MouseEvent) => {
    const col = Number(current.get('col'));
    if (col > -1) {
      const data = tableDataObject.removeColumn(col);
      blockProps.onRichCommand('change-table-data', { block, data });
    }
  };

  /**
   * 행 추가
   * - current가 header나 footer에 있을 수 있고, body에 행이 없을 수도 있다.
   * - footer인 경우 맨 마지막줄 추가 */
  const handleInsertRowClick = (event: React.MouseEvent) => {
    let row = Number(current.get('row'));
    if (current.get('type') === 'footer') row = Number.MAX_SAFE_INTEGER;
    const data = tableDataObject.insertRow(row === -1 ? 0 : row);
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /** 행 삭제 */
  const handleRemoveRowClick = (event: React.MouseEvent) => {
    const type = String(current.get('type'));
    const index = Number(current.get('row'));
    const data = tableDataObject.removeRow(type, index);
    blockProps.onRichCommand('change-table-data', { block, data });
  };

  /** 테이블 삭제 */
  const handleRemoveTableClick = (event: React.MouseEvent) => {
    blockProps.onRichCommand('remove-table', { block });
  };

  return (
    <div className="public-DraftStyleDefault-ltr">
      <div className={classes.root} onFocus={handleFocus} onBlur={handleFocus} id={blockKey}>
        <table className={classes.table}>
          <thead>
            <tr>
              {tableData && tableData.header
                ? tableData.header.map((header: TableCell, index: number) => (
                    <th className={classes.th} key={index.toString()}>
                      <div
                        aria-label={blockKey}
                        className={classes.tdInput}
                        contentEditable
                        suppressContentEditableWarning
                        onFocus={(e) => {
                          handleEnterCell(e, 'header', -1, index, header.text);
                        }}
                        onBlur={(e) => {
                          handleHeaderChange(e, index);
                        }}
                      >
                        {header.text}
                      </div>
                    </th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.body
              ? tableData.body.map((row: TableCell[], rowIndex: number) => (
                  <tr key={rowIndex.toString()}>
                    {row.map((col: TableCell, colIndex: number) => (
                      <td className={classes.td} key={colIndex.toString()}>
                        <div
                          aria-label={blockKey}
                          className={classes.tdInput}
                          contentEditable
                          suppressContentEditableWarning
                          onFocus={(e) => {
                            handleEnterCell(e, 'body', rowIndex, colIndex, col.text);
                          }}
                          onBlur={(e) => {
                            handleCellChange(e, rowIndex, colIndex);
                          }}
                        >
                          {col.text}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
          <tfoot>
            <tr>
              {tableData && tableData.footer
                ? tableData.footer.map((footer: TableCell, index: number) => (
                    <td className={classes.tf} key={index.toString()}>
                      <div
                        aria-label={blockKey}
                        className={classes.tdInput}
                        contentEditable
                        suppressContentEditableWarning
                        onFocus={(e) => {
                          handleEnterCell(e, 'footer', -1, index, footer.text);
                        }}
                        onBlur={(e) => {
                          handleFooterChange(e, index);
                        }}
                      >
                        {footer.text}
                      </div>
                    </td>
                  ))
                : null}
            </tr>
          </tfoot>
        </table>
        {current.get('isFocused') ? (
          <div className={classes.toolbar}>
            <Button
              onClick={handleInsertHeaderClick}
              aria-label={blockKey}
              disabled={tableDataObject.get('header').length > 0}
            >
              헤더 추가
            </Button>
            <Button
              onClick={handleInsertFooterClick}
              aria-label={blockKey}
              disabled={tableDataObject.get('footer').length > 0}
            >
              풋터 추가
            </Button>
            <Button onClick={handleInsertColumnClick} aria-label={blockKey}>
              컬럼 추가
            </Button>
            <Button onClick={handleRemoveColumnClick} aria-label={blockKey}>
              컬럼 삭제
            </Button>
            <Button onClick={handleInsertRowClick} aria-label={blockKey}>
              행 추가
            </Button>
            <Button onClick={handleRemoveRowClick} aria-label={blockKey}>
              행 삭제
            </Button>
            <Button onClick={handleRemoveTableClick} aria-label={blockKey}>
              테이블 삭제
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RichTable;

// RichTableData {__ownerID: undefined, _values: List}
// header: (...)
// body: (...)
// footer: (...)
// rowCount: (...)
// __ownerID: undefined
// _values: List
// size: 3
// _origin: 0
// _capacity: 3
// _level: 5
// _root: null
// _tail: VNode
// array: Array(3)
// 0: (4) [{…}, {…}, {…}, {…}]
// 1: (3) [Array(4), Array(4), Array(4)]
// 2: (4) [{…}, {…}, {…}, {…}]
// length: 3
// __proto__: Array(0)
// ownerID: OwnerID {}
// __proto__: Object
// __ownerID: undefined
// __hash: undefined
// __altered: false
// __proto__: IndexedCollection
// __proto__: Record

// RichTableData {__ownerID: undefined, _values: List}
// header: (...)
// body: (...)
// footer: (...)
// rowCount: (...)
// __ownerID: undefined
// _values: List
// size: 3
// _origin: 0
// _capacity: 3
// _level: 5
// _root: null
// _tail: VNode
// array: (3) [List, List, List]
// ownerID: OwnerID {}
// __proto__: Object
// __ownerID: undefined
// __hash: undefined
// __altered: false
// __proto__: IndexedCollection
// __proto__: Record
