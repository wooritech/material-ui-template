import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import { ComponentBaseProps } from './types';
import BrandLogo from './BrandLogo';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: theme.custom.drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    minHeight: theme.custom.headerHomeHeight,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerPaper: {
    width: theme.custom.drawerWidth,
  },
  item: {
    color: '#ffffff',
  },
  itemText: {
    fontSize: '24px',
    color: '#C6C6C6',
  },
  divider: {
    margin: '0 40px',
  },
}));

export interface SidebarMainProps extends ComponentBaseProps {}

const SidebarMain: React.FC<SidebarMainProps> = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarMenu = [
    [
      {
        key: 'myProject',
        title: '내 프로젝트',
      },
    ],
    [
      {
        key: 'profiles',
        title: '계정 설정',
      },
      {
        key: 'settings',
        title: '시스템 설정',
      },
    ],
  ];

  const SideMenus: React.FC = () => {
    const primaryTypography = (title: string) => (
      <Typography className={classes.itemText}>{title}</Typography>
    );

    return (
      <>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <BrandLogo />
          </Grid>
        </Toolbar>
        {/* <Divider /> */}
        {sidebarMenu.map((groups, groupIndex) => (
          <>
            <List>
              {groups.map((item) => (
                <ListItem className={classes.item} button key={item.key}>
                  {/* <ListItemIcon>{itemIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemText inset primary={primaryTypography(item.title)} />
                </ListItem>
              ))}
            </List>

            {groupIndex < sidebarMenu.length - 1 ? (
              <Divider className={classes.divider} variant="middle" />
            ) : null}
          </>
        ))}
      </>
    );
  };

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SideMenus />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <SideMenus />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default SidebarMain;
