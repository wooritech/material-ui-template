/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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
    minHeight: theme.custom.headerHeightEdit,
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

interface HeaderHomeProps extends ComponentBaseProps {
  isLoggedIn?: boolean;
}

const HeaderHome: React.FC<HeaderHomeProps> = (props) => {
  const classes = useStyles();
  const { isLoggedIn = true } = props;

  return (
    <ElevationScroll>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <BrandLogo imageName="logo-title-blue.png" />
            <Grid item xs />
            {isLoggedIn ? (
              <>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="inherit"
                    size="medium"
                    href="/projects"
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
