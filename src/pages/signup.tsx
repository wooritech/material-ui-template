import React from 'react';
import { NextPage } from 'next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BlankLayout from '~/layouts/BlankLayout';
import BlankHeader from '~/components/BlankHeader';
import SignupForm from '~/components/SignupForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  signinBox: {
    align: 'center',
    width: 500,
  },
}));

const SignupPage: NextPage = () => {
  const classes = useStyles();
  return (
    <BlankLayout>
      <Grid container className={classes.root} justify="center" alignItems="baseline">
        <Grid item className={classes.signinBox}>
          <BlankHeader title="RealDocs 사용자 등록" showLogo />
          <SignupForm linkSigin="/signin" />
        </Grid>
      </Grid>
    </BlankLayout>
  );
};

export default SignupPage;
