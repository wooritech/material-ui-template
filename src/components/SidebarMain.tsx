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
import { useRouter } from 'next/router';

import { ComponentBaseProps } from './types';
import BrandLogo from './BrandLogo';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: theme.custom.sidebarWidthMain,
      flexShrink: 0,
    },
  },
  toolbar: {
    minHeight: theme.custom.headerHeightEdit,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerPaper: {
    width: theme.custom.sidebarWidthMain,
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  type MenuItem = {
    _id: number;
    title: string;
    href: string;
    divider?: boolean;
  };

  const sidebarMenu: MenuItem[] = [
    {
      _id: 1,
      title: '내 프로젝트',
      href: '/projects',
    },
    {
      _id: 2,
      title: '',
      href: '',
      divider: true,
    },
    {
      _id: 3,
      title: '계정 설정',
      href: '/profiles',
    },
    {
      _id: 4,
      title: '시스템 설정',
      href: '/settings',
    },
  ];

  const SideMenus: React.FC = () => {
    const router = useRouter();
    const selectedItem = (item: MenuItem): boolean => {
      return router.asPath.startsWith(item.href);
    };

    // 선택된 item text 스타일 다르게 적용하기위해.
    // 이게 override된 테마 스타일에서는 적용이 안된다.
    const primaryTypography = (title: string, selected: boolean) => {
      const clsName = selected ? classes.selectedItemText : classes.itemText;
      return <Typography className={clsName}>{title}</Typography>;
    };

    return (
      <>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={1} alignItems="center">
            <BrandLogo imageName="logo-title-21243d.png" />
          </Grid>
        </Toolbar>
        <List component="nav">
          {sidebarMenu.map((item) => (
            // map() loop 바로 아래 노드에 key 설정 해야한다.
            <div key={item._id}>
              {item.divider ? (
                <Divider className={classes.divider} variant="middle" />
              ) : (
                <ListItem component="a" href={item.href} selected={selectedItem(item)} button>
                  {/* <ListItemIcon>{itemIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemText inset primary={primaryTypography(item.title, selectedItem(item))} />
                </ListItem>
              )}
            </div>
          ))}
        </List>
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
      <Hidden mdDown implementation="css">
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
