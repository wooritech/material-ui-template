/**
 * 커스텀 에러 페이지
 * - https://nextjs.org/docs#custom-error-handling
 */
import { NextPage, NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import makeStyles from '@material-ui/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BlankLayout from '~/layouts/BlankLayout';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
}));

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  const classes = useStyles();
  return (
    <BlankLayout>
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item>
          <Typography color="error" align="center">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </Typography>
        </Grid>
      </Grid>
    </BlankLayout>
  );
};

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  const { res, err } = ctx;

  let statusCode: number;
  if (res) {
    statusCode = res.statusCode;
  } else if (err && err.statusCode) {
    statusCode = err.statusCode;
  } else {
    statusCode = 400;
  }

  return {
    statusCode,
  };
};

export default ErrorPage;
