import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';

import { ComponentBaseProps } from './types';
import BrandLogo from './BrandLogo';
import SidebarEditToc from './SidebarEditToc';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: theme.custom.sidebarWidthEdit,
      flexShrink: 0,
    },
  },
  toolbar: {
    minHeight: theme.custom.headerHeightHome,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  drawerPaper: {
    width: theme.custom.sidebarWidthEdit,
  },
}));

export interface SidebarMainProps extends ComponentBaseProps {}

const SidebarMain: React.FC<SidebarMainProps> = () => {
  const classes = useStyles();

  const documentToc = (
    <>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={1} alignItems="center">
          <BrandLogo imageName="logo-title-f2f3f8.png" />
        </Grid>
      </Toolbar>
      <SidebarEditToc />
    </>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {documentToc}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {documentToc}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default SidebarMain;
