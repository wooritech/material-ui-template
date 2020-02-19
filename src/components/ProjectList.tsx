import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      margin: theme.spacing(0),
    },
    container: {
      boxShadow: 'none',
    },
    table: {
      minWidth: 650,
      tableLayout: 'fixed',
    },
    countCell: {
      width: '100px',
    },
  }),
);

const createData = (
  projectId: string,
  projectName: string,
  projectDescription: string,
  latestVersion: string,
  projectOwner: string,
  constructorCount: number,
) => {
  return {
    projectId,
    projectName,
    projectDescription,
    latestVersion,
    projectOwner,
    constructorCount,
  };
};

const rows = [
  createData('DOCID00', 'realgrid docs v2', '', 'v0.1', '홍길동', 5),
  createData('DOCID01', '아이랩 도움말1', '', '3.0.1', '홍길동', 5),
  createData('DOCID02', '아이랩 도움말2', '', '3.0.1', '홍길동', 5),
  createData('DOCID03', '아이랩 도움말3', '', '3.0.1', '홍길동', 5),
  createData('DOCID04', '아이랩 도움말4', '', '3.0.1', '홍길동', 5),
  createData('DOCID05', '아이랩 도움말5', '', '3.0.1', '홍길동', 5),
  createData('DOCID06', '아이랩 도움말6', '', '3.0.1', '홍길동', 5),
  createData('DOCID07', '아이랩 도움말7', '', '3.0.1', '홍길동', 5),
  createData('DOCID08', '아이랩 도움말8', '', '3.0.1', '홍길동', 5),
];

interface ProjectListProps extends ComponentBaseProps {}

const ProjectList: React.FC<ProjectListProps> = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>프로젝트 명</TableCell>
              <TableCell>프로젝트 설명</TableCell>
              <TableCell>최신 문서 버전</TableCell>
              <TableCell>소유자</TableCell>
              <TableCell className={classes.countCell}>참여자 수</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.projectId}>
                <TableCell component="th" scope="row">
                  {row.projectId}
                </TableCell>
                <TableCell>
                  <Link href="/projects/settings">{row.projectName}</Link>
                </TableCell>
                <TableCell>{row.projectDescription}</TableCell>
                <TableCell>
                  <Link href="/edit">{row.latestVersion}</Link>
                </TableCell>
                <TableCell>{row.projectOwner}</TableCell>
                <TableCell align="right">{row.constructorCount}</TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProjectList;
