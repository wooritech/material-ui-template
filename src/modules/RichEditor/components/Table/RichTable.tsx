import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  table: {
    width: '100%',
    border: '1px solid red',
    borderCollapse: 'collapse',
  },
  td: {
    border: '1px solid red',
    padding: theme.spacing(1),
  },
}));

interface RichTableProps {
  tableData: any;
}

/** RichTable */
const RichTable: React.FC<RichTableProps> = (props) => {
  const classes = useStyles();
  const { tableData } = props;

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            {tableData && tableData.headers
              ? tableData.headers.map((header: any, index: number) => (
                  <th className={classes.td} key={index.toString()}>
                    <span contentEditable suppressContentEditableWarning>
                      {header.text}
                    </span>
                  </th>
                ))
              : null}
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.rows
            ? tableData.rows.map((row: any, rowIndex: number) => (
                <tr key={rowIndex.toString()}>
                  {row.map((col: any, colIndex: number) => (
                    <td className={classes.td} key={colIndex.toString()}>
                      {col.text}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default RichTable;
