/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import BrandLogo from './BrandLogo';
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
  toolbar: {
    minHeight: theme.custom.homeHeaderHeight,
    // alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
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

interface HomeHeaderProps extends ComponentBaseProps {
  isLoggedIn?: boolean;
}

const HeaderHome: React.FC<HomeHeaderProps> = (props) => {
  const classes = useStyles();
  const { isLoggedIn = false } = props;

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
            <BrandLogo />
            <Grid item xs />
            {isLoggedIn ? (
              <>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="inherit"
                    size="medium"
                  >
                    내 프로젝트
                  </Button>
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

export default HeaderHome;
