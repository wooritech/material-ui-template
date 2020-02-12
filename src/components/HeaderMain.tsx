/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';

import { ComponentBaseProps } from './types';

const lightColor = 'rgba(255, 255, 255, 0.7)';
const useStyles = makeStyles((theme: Theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 3,
  },
  pageTitle: {
    color: 'black',
    fontWeight: 500,
  },
  toolbar: {
    minHeight: theme.custom.headerHeightMain,
    // alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    background: 'white',
  },
  button: {
    borderColor: lightColor,
  },
}));

interface ESProps extends ComponentBaseProps {
  children: React.ReactElement;
}

const ElevationScroll: React.FC<ESProps> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

interface HeaderMainProps extends ComponentBaseProps {
  isLoggedIn?: boolean;
  pageTitle: string;
}

const HeaderMain: React.FC<HeaderMainProps> = (props) => {
  const classes = useStyles();
  const { isLoggedIn = true, pageTitle } = props;

  return (
    <ElevationScroll>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  // onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Typography className={classes.pageTitle} variant="h5">
              {pageTitle}
            </Typography>
            <Grid item xs />
            {isLoggedIn ? (
              <>
                <Grid item>
                  <Link href="/profiles">onlydel</Link>
                </Grid>
                <Grid item>
                  <IconButton color="inherit" className={classes.iconButtonAvatar}>
                    <Avatar variant="rounded" src="/images/avatar/1.jpg" alt="My Avatar" />
                  </IconButton>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="inherit"
                    size="medium"
                    href="/signin"
                  >
                    로그인
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.button} color="inherit" size="medium" href="/signup">
                    가입
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default HeaderMain;
