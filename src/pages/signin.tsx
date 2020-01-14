import React from 'react';
import { NextPage } from 'next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LayoutBlank from '~/layouts/LayoutBlank';
import SigninForm from '~/components/SigninForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  header: {
    margin: theme.spacing(3),
  },
  signinBox: {
    align: 'center',
    width: 500,
  },
}));

const SigninPage: NextPage = () => {
  const classes = useStyles();
  return (
    <LayoutBlank>
      <Grid container className={classes.root} justify="center" alignItems="baseline">
        <Grid item className={classes.signinBox}>
          <Grid container justify="center">
            <Grid item>
              <LockOpenOutlined style={{ fontSize: 80 }} />
            </Grid>
          </Grid>
          <Grid container justify="center" className={classes.header}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                RealDocs 사용자 로그인
              </Typography>
            </Grid>
          </Grid>
          <SigninForm linkSignup="/signup" />
        </Grid>
      </Grid>
    </LayoutBlank>
  );
};

export default SigninPage;
