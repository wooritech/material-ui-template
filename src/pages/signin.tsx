import React from 'react';
import { NextPage } from 'next';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LayoutBlank from '~/layouts/LayoutBlank';
import SigninForm from '~/components/SigninForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  header: {
    // margin: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    fontWeight: 500,
  },
  logo: {
    height: 80,
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
              <img
                src="/images/logo-fafafa.png"
                alt="Real Document Director"
                className={classes.logo}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h4" gutterBottom className={classes.header}>
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
