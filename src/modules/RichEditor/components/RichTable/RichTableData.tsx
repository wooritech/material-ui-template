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

const newcell = { text: '' };
const newcells = [{ text: '' }, { text: '' }, { text: '' }];

export const defaultTableData: TableData = {
  header: newcells,
  body: [newcells, newcells],
  footer: newcells,
};

export default class RichTableData extends Immutable.Record(defaultTableData) implements TableData {
  constructor(tableData?: TableData) {
    if (tableData) super(tableData);
    else super(Immutable.Map(defaultTableData));
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

  get hasHeader(): boolean {
    /** array 가 아닐수는 없다. */
    return this.header.length > 0;
  }

  get hasFooter(): boolean {
    return this.footer.length > 0;
  }

  /** body row count */
  get rowCount(): number {
    return this.body.length;
  }

  /**
   * header footer body 가 각각 없을수도 있다는 가정으로 처리 실제로는 body는 없을 수 없음
   * 최소 1행을 남겨둠 */
  get colCount(): number {
    if (this.header) return this.header.length;
    if (this.footer) return this.footer.length;
    if (this.body && this.body.length > 0) return this.body[0].length;
    throw new Error('Do not count of columns.');
  }

  private insertHeaderCell(index: number) {
    this.header.splice(index, 0, newcell);
  }

  private insertBodyCells(index: number) {
    this.body.map((row) => row.splice(index, 0, newcell));
  }

  private insertFooterCell(index: number) {
    this.footer.splice(index, 0, newcell);
  }

  private removeHeaderCell(index: number) {
    this.header.splice(index, 1);
  }

  private removeBodyCells(index: number) {
    this.body.map((row) => row.splice(index, 1));
  }

  private removeFooterCell(index: number) {
    this.footer.splice(index, 1);
  }

  private self(): RichTableData {
    return this as RichTableData;
  }

  private setHeader(header: TableCellList): RichTableData {
    return this.set('header', header) as RichTableData;
  }

  private setFooter(footer: TableCellList): RichTableData {
    return this.set('footer', footer) as RichTableData;
  }

  insertColumn(index: number): RichTableData {
    this.insertHeaderCell(index);
    this.insertBodyCells(index);
    this.insertFooterCell(index);
    return this.self();
  }

  /** 헤더 추가 */
  insertHeader(): RichTableData {
    if (!this.hasHeader) return this.setHeader(newcells);
    return this.self();
  }

  insertFooter(): RichTableData {
    if (!this.hasFooter) return this.setFooter(newcells);
    return this.self();
  }

  /** body 행 추가 */
  insertRow(index: number): RichTableData {
    const length = this.colCount;
    const newRow = Array.from({ length }, () => {
      return { text: index.toString() };
    });
    this.body.splice(index, 0, newRow);
    return this.self();
  }

  /** 현재 행 삭제, header, body, footer 동시 적용 */
  removeRow(type: string, index: number): RichTableData {
    switch (type) {
      case 'header':
        return this.removeHeader();
      case 'body':
        return this.removeBodyRow(index);
      case 'footer':
        return this.removeFooter();
      default:
        return this.self();
    }
  }

  removeColumn(index: number): RichTableData {
    if (this.colCount === 1) throw new Error('Please leave the last column!');
    this.removeHeaderCell(index);
    this.removeBodyCells(index);
    this.removeFooterCell(index);
    return this.self();
  }

  removeBodyRow(index: number): RichTableData {
    if (this.rowCount === 1) throw new Error(`Please leave the last row!`);
    this.body.splice(index, 1);
    return this.self();
  }

  removeHeader(): RichTableData {
    return this.setHeader([]);
  }

  removeFooter(): RichTableData {
    return this.setFooter([]);
  }

  setHeaderCell(index: number, text: string): RichTableData {
    this.header[index] = { text };
    return this.self();
  }

  setBodyCell(rowIndex: number, colIndex: number, text: string): RichTableData {
    this.body[rowIndex][colIndex] = { text };
    return this.self();
  }

  setFooterCell(index: number, text: string): RichTableData {
    this.footer[index] = { text };
    return this.self();
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
                    {header.text ? header.text : <>&nbsp;</>}
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
                    {cell.text ? cell.text : <>&nbsp;</>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {tableData.footer.map((footer: TableCell, index: number) => {
              return (
                <td style={styles.tf} key={index.toString()}>
                  {footer.text ? footer.text : <>&nbsp;</>}
                </td>
              );
            })}
          </tfoot>
        </table>
      </div>
    );
  }
}
