import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DraftBlockComponentProps } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  table: {
    width: '100%',
    border: '1px solid red',
    borderCollapse: 'collapse',
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

interface RichTableProps extends DraftBlockComponentProps {
  tableData: any;
}

/**
 * RichTable
 */
const RichTable: React.FC<RichTableProps> = (props) => {
  const classes = useStyles();
  const { contentState, block, tableData, blockProps, selection } = props;
  const blockKey = block.getKey();

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
      blockProps.onRichCommand('on-focus-table');
      console.log(`<< on-focus-table: (${blockKey})`);
    }
  };

  /** 포커스가 이 테이블을 벗어날때 발생 */
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();

    /** 셀 간 이동시 테이블 leave 이벤트는 보류 */
    if (isRelatedFocusing(event.relatedTarget)) return;

    if (blockProps?.onRichCommand) {
      const newData = {
        header: [{ text: 'header1' }],
        body: [[{ text: 'cell0,0' }], [{ text: 'cell1,0' }]],
        footer: [{ text: 'footer1' }],
      };
      blockProps.onRichCommand('on-leave-table', { contentState, block, data: newData });
      console.log(`(${blockKey}) :on-leave-table >>`);
    }
  };

  /** header의 contentEditable에 의해 생성된 input을 벗어날때 이벤트
   * onChange이벤트, onInput이벤트등을 이용할 수도 있다. */
  const handleHeaderChange = (
    event: React.FocusEvent<HTMLDivElement>,
    header: any,
    index: number,
  ) => {
    console.log(`exit header[${index}]`, event.currentTarget.textContent);
  };

  /** cell의 contentEditable에 의해 생성된 input을 벗어날때 이벤트 */
  const handleCellChange = (
    event: React.FocusEvent<HTMLDivElement>,
    cell: any,
    rowIndex: number,
    colIndex: number,
  ) => {
    console.log(`exit cell[${colIndex}, ${rowIndex}]`, event.currentTarget.textContent);
  };

  return (
    <div className={classes.root} onFocus={handleFocus} onBlur={handleBlur} id={blockKey}>
      <table className={classes.table}>
        <thead>
          <tr>
            {tableData && tableData.header
              ? tableData.header.map((header: any, index: number) => (
                  <th className={classes.th} key={index.toString()}>
                    <div
                      aria-label={blockKey}
                      className={classes.tdInput}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        handleHeaderChange(e, header, index);
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
            ? tableData.body.map((row: any, rowIndex: number) => (
                <tr key={rowIndex.toString()}>
                  {row.map((col: any, colIndex: number) => (
                    <td className={classes.td} key={colIndex.toString()}>
                      <div
                        aria-label={blockKey}
                        className={classes.tdInput}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          handleCellChange(e, col, rowIndex, colIndex);
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
              ? tableData.footer.map((footer: any, index: number) => (
                  <td className={classes.tf} key={index.toString()}>
                    <div
                      aria-label={blockKey}
                      className={classes.tdInput}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        handleHeaderChange(e, footer, index);
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
  );
};

export default RichTable;
