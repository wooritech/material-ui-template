/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Immutable from 'immutable';

import { ReactElement } from 'react';
import { TableCell, TableData, TableCellList, TableCellGroup } from './types';

export const tableStyles = (editing: boolean) => {
  /** todo
    - [ ] 스타일링 좀더 고민하고 수정이 필요하다.  */
  const border = editing ? ('1px solid red' as string) : ('1px solid' as string);
  return {
    root: {
      width: '100%',
    },
    table: {
      width: '100%',
      /**
        - [ ] BUG 문제없어 보이는데 오류
        (JSX attribute) HTMLAttributes<HTMLTableElement>.style?: CSSProperties | undefined
        Type '{ width: string; borderCollapse: string; border: string; }' is not assignable to type 'CSSProperties'.
          Types of property 'borderCollapse' are incompatible.
            Type 'string' is not assignable to type '"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "collapse" | "separate" | undefined'.ts(2322)
        index.d.ts(1759, 9): The expected type comes from property 'style' which is declared here on type 'DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>' */
      borderCollapse: 'collapse',
      border,
    },
    th: {
      backgroundColor: '#eee',
      border,
    },
    td: {
      border,
    },
    tf: {
      backgroundColor: '#eee',
      border,
    },
    tdInput: {
      padding: '8px',
    },
  };
};

export const defaultTableData: TableData = {
  header: Immutable.List([{ text: '' }, { text: '' }, { text: '' }]),
  body: Immutable.List([
    Immutable.List([{ text: '' }, { text: '' }, { text: '' }]),
    Immutable.List([{ text: '' }, { text: '' }, { text: '' }]),
  ]),
  footer: Immutable.List([{ text: '' }, { text: '' }, { text: '' }]),
};

export default class RichTableData extends Immutable.Record(defaultTableData) implements TableData {
  constructor(tableData?: TableData) {
    if (tableData) super(tableData);
    else super(defaultTableData);
  }

  get header(): TableCellList {
    return this.get('header');
  }

  get body(): TableCellGroup {
    return this.get('body');
  }

  get footer(): TableCellList {
    return this.get('footer');
  }

  setHeaderCell(index: number, text: string): RichTableData {
    const header = this.get('header');
    header[index] = { text };
    return this.set('header', header) as RichTableData;
  }

  setBodyCell(rowIndex: number, colIndex: number, text: string): RichTableData {
    const body = this.get('body');
    body[rowIndex][colIndex] = { text };
    return this.set('body', body) as RichTableData;
  }

  setFooterCell(index: number, text: string): RichTableData {
    const footer = this.get('footer');
    footer[index] = { text };
    return this.set('footer', footer) as RichTableData;
  }

  toHTML(): ReactElement {
    const styles = tableStyles(false);

    /**
      - [ ] 불러온 데이터를 변환할때와 툴바에서 생성한 경우의 데이터 구조가 달라진다.
      이 문제는 toJS()로 변환하면서 해결되긴 하지만 정확한 타입으로 처리할때 문제가 생길수 있다.
      예) this.header의 타입은 데이터를 읽어 온다음 편집을 마치면 List 이고 툴바로 생성하면 Array 이다. */
    const tableData = this.toJS();

    return (
      <div style={styles.root}>
        {/* 위 styles에 table borderCollaps때문에 오류 */}
        <table
          style={{
            width: '100%',
            border: 'solid 1px',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
          }}
        >
          <thead>
            <tr>
              {tableData.header.map((header: TableCell, index: number) => {
                return (
                  <th style={styles.th} key={index.toString()}>
                    {header.text}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.body.map((rows: TableCell[], rowIndex: number) => (
              <tr key={rowIndex.toString()}>
                {rows.map((cell: TableCell, colIndex: number) => (
                  <td style={styles.td} key={colIndex.toString()}>
                    {cell.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {tableData.footer.map((footer: TableCell, index: number) => {
              return (
                <td style={styles.tf} key={index.toString()}>
                  {footer.text}
                </td>
              );
            })}
          </tfoot>
        </table>
      </div>
    );
  }
}
