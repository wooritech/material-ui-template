/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import SidebarEdit from '~/components/SidebarEdit';
import Copyright from '~/components/Copyright';
import HeaderEdit from '~/components/HeaderEdit';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.custom.drawerWidth}px)`,
      marginLeft: theme.custom.drawerWidth,
    },
  },
  main: {
    flex: 1,
    // 기준 간격은 40px;
    padding: theme.spacing(0),
  },
  footer: {
    padding: theme.spacing(2),
  },
}));

export interface LayoutEditProps extends LayoutBaseProps {
  pageTitle: string;
}

const LayoutEdit: React.FC<LayoutEditProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <HeaderEdit {...props} />
      <SidebarEdit {...props} />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default LayoutEdit;
