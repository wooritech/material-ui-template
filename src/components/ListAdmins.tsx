import React from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ComponentBaseProps } from './types';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      // borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
    head: {
      backgroundColor: theme.palette.grey[100],
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
  },
  table: {
    minWidth: 650,
  },
});

function createData(username: string, email: string) {
  return { username, email };
}

const rows = [createData('onlydel', 'onlydel@wooritech.com')];

interface ListAdminsProps extends ComponentBaseProps {}

const ListAdmins: React.FC<ListAdminsProps> = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>사용자 아이디</StyledTableCell>
            <StyledTableCell>이메일 주소</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListAdmins;
