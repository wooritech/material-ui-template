import React from 'react';
import { NextPage } from 'next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBlank from '~/layouts/LayoutBlank';
import FormForgotPassword from '~/components/FormForgotPassword';
import HeaderBlank from '~/components/HeaderBlank';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  signinBox: {
    align: 'center',
    width: 500,
  },
}));

const PasswordResetPage: NextPage = () => {
  const classes = useStyles();
  return (
    <LayoutBlank>
      <Grid container className={classes.root} justify="center" alignItems="baseline">
        <Grid item className={classes.signinBox}>
          <HeaderBlank title="RealDocs 사용자 암호 초기화" showLogo />
          <FormForgotPassword linkSignup="/signup" />
        </Grid>
      </Grid>
    </LayoutBlank>
  );
};

export default PasswordResetPage;
