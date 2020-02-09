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
    menuIndex: number;
    title: string;
    href: string;
  };

  const sidebarMenu: MenuItem[][] = [
    [
      {
        menuIndex: 1,
        title: '내 프로젝트',
        href: '/projects',
      },
    ],
    [
      {
        menuIndex: 2,
        title: '계정 설정',
        href: '/profiles',
      },
      {
        menuIndex: 3,
        title: '시스템 설정',
        href: '/settings',
      },
    ],
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
            <BrandLogo />
          </Grid>
        </Toolbar>
        <>
          <List component="nav">
            {sidebarMenu.map((groups, groupIndex) => (
              <>
                {groups.map((item) => (
                  <ListItem
                    component="a"
                    href={item.href}
                    selected={selectedItem(item)}
                    button
                    key={item.menuIndex}
                  >
                    {/* <ListItemIcon>{itemIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText
                      inset
                      primary={primaryTypography(item.title, selectedItem(item))}
                    />
                  </ListItem>
                ))}

                {groupIndex < sidebarMenu.length - 1 ? (
                  <Divider className={classes.divider} variant="middle" />
                ) : null}
              </>
            ))}
          </List>
        </>
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
