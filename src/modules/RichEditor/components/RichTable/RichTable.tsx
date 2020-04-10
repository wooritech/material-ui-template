import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DraftBlockComponentProps } from '../types';
import RichTableData from './RichTableData';
import { TableCell } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  table: {
    width: '100%',
    border: '1px solid red',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  th: {
    backgroundColor: '#eee',
    border: '1px solid red',
  },
  td: {
    border: '1px solid red',
  },
  tf: {
    backgroundColor: '#eee',
    border: '1px solid red',
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
const RichTable: React.FC<DraftBlockComponentProps> = (props) => {
  const { contentState, block, blockProps } = props;
  const classes = useStyles();
  const blockKey = block.getKey();
  const tableData = new RichTableData(block.getData().toJS());

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
    event.preventDefault();

    /** 셀 간 이동시 테이블 focus 이벤트는 보류 */
    if (isRelatedFocusing(event.relatedTarget)) return;

    if (blockProps?.onRichCommand) {
      blockProps.onRichCommand('focus-table');
      console.log(`<< on-focus-table: (${blockKey})`);
    }
  };

  /** 포커스가 이 테이블을 벗어날때 발생 */
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();

    /** 셀 간 이동시 테이블 leave 이벤트는 보류 */
    if (isRelatedFocusing(event.relatedTarget)) return;

    if (blockProps?.onRichCommand) {
      blockProps.onRichCommand('leave-table');
      console.log(`(${blockKey}) :leave-table >>`);
    }
  };

  /** header의 contentEditable에 의해 생성된 input을 벗어날때 이벤트
   * onChange이벤트, onInput이벤트등을 이용할 수도 있다. */
  const handleHeaderChange = (event: React.FocusEvent, index: number) => {
    const text = event.currentTarget.textContent || '';
    const data = tableData.setHeaderCell(index, text);
    blockProps.onRichCommand('change-table-data', { contentState, block, data });
  };

  /** footer input을 벗어날때 이벤트 */
  const handleFooterChange = (event: React.FocusEvent, index: number) => {
    const text = event.currentTarget.textContent || '';
    const data = tableData.setFooterCell(index, text);
    blockProps.onRichCommand('change-table-data', { contentState, block, data });
  };

  /** cell input을 벗어날때 이벤트 */
  const handleCellChange = (event: React.FocusEvent, rowIndex: number, colIndex: number) => {
    const text = event.currentTarget.textContent || '';
    const data = tableData.setBodyCell(rowIndex, colIndex, text);
    blockProps.onRichCommand('change-table-data', { contentState, block, data });
  };

  return (
    <div className="public-DraftStyleDefault-ltr">
      <div className={classes.root} onFocus={handleFocus} onBlur={handleBlur} id={blockKey}>
        <table className={classes.table}>
          <thead>
            <tr>
              {tableData && tableData.header
                ? tableData.get('header').map((header: TableCell, index: number) => (
                    <th className={classes.th} key={index.toString()}>
                      <div
                        aria-label={blockKey}
                        className={classes.tdInput}
                        contentEditable
                        suppressContentEditableWarning
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
              ? tableData.get('body').map((row: TableCell[], rowIndex: number) => (
                  <tr key={rowIndex.toString()}>
                    {row.map((col: TableCell, colIndex: number) => (
                      <td className={classes.td} key={colIndex.toString()}>
                        <div
                          aria-label={blockKey}
                          className={classes.tdInput}
                          contentEditable
                          suppressContentEditableWarning
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
                ? tableData.get('footer').map((footer: TableCell, index: number) => (
                    <td className={classes.tf} key={index.toString()}>
                      <div
                        aria-label={blockKey}
                        className={classes.tdInput}
                        contentEditable
                        suppressContentEditableWarning
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
      </div>
    </div>
  );
};

export default RichTable;
