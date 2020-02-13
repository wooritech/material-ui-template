import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { ComponentBaseProps } from './types';

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

interface HeaderBlankPorps extends ComponentBaseProps {
  title: string;
  showLogo: boolean;
}

const HeaderBlank: React.FC<HeaderBlankPorps> = (props) => {
  const classes = useStyles();
  const { title, showLogo } = props;

  return (
    <>
      {title ? (
        <Grid container justify="center">
          <Grid item>
            <img
              src="/images/logo-f2f3f8.png"
              alt="Real Document Director"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      ) : null}
      {showLogo ? (
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h4" gutterBottom className={classes.header}>
              {title}
            </Typography>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default HeaderBlank;
