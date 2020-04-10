export type TableCell = {
  text: string;
};

export type TableCellList = Immutable.List<TableCell>;
export type TableCellGroup = Immutable.List<TableCellList>;

export interface TableData {
  header: TableCellList;
  body: TableCellGroup;
  footer: TableCellList;
}
