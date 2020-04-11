/* eslint-disable @typescript-eslint/no-explicit-any */
export type TableCell = {
  text: string;
};

export type TableCellList = TableCell[];
export type TableCellGroup = TableCellList[];

export interface TableData {
  header: TableCellList;
  body: TableCellGroup;
  footer: TableCellList;
}

export type TableCurrent = {
  isFocused: boolean;
  selection:
    | {
        type: string;
        row: number | undefined;
        col: number | undefined;
        text: string;
      }
    | undefined;
};
