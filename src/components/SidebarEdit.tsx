import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: theme.custom.sidebarWidthEdit,
      flexShrink: 0,
    },
  },
  toolbar: {
    minHeight: theme.custom.headerHeightHome,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerPaper: {
    width: theme.custom.sidebarWidthEdit,
  },
  item: {
    color: '#ffffff',
  },
  itemText: {
    fontSize: '24px',
    color: '#C6C6C6',
  },
  selectedItemText: {
    fontSize: '24px',
    color: theme.palette.primary.main,
  },
  divider: {
    margin: '0 40px',
  },
}));

export interface SidebarMainProps extends ComponentBaseProps {}

const SidebarMain: React.FC<SidebarMainProps> = () => {
  const classes = useStyles();

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        />
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        />
      </Hidden>
    </nav>
  );
};

export default SidebarMain;
