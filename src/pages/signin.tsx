import React from 'react';
import { NextPage } from 'next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BlankLayout from '~/layouts/BlankLayout';
import SigninForm from '~/components/SigninForm';
import BlankHeader from '~/components/BlankHeader';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  signinBox: {
    align: 'center',
    width: 500,
  },
}));

const SigninPage: NextPage = () => {
  const classes = useStyles();
  return (
    <BlankLayout>
      <Grid container className={classes.root} justify="center" alignItems="baseline">
        <Grid item className={classes.signinBox}>
          <BlankHeader title="RealDocs 사용자 로그인" showLogo />
          <SigninForm linkSignup="/signup" linkForgotPassword="/forgotPassword" />
        </Grid>
      </Grid>
    </BlankLayout>
  );
};

export default SigninPage;
