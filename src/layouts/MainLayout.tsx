/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import MainSidebar from '~/components/MainSidebar';
import Copyright from '~/components/Copyright';
import MainHeader from '~/components/MainHeader';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.custom.sidebarWidthMain}px)`,
      marginLeft: theme.custom.sidebarWidthMain,
    },
  },
  main: {
    flex: 1,
    // 기준 간격은 40px;
    padding: theme.spacing(5),
  },
  footer: {
    padding: theme.spacing(2),
  },
}));

export interface LayoutMainProps extends LayoutBaseProps {
  pageTitle: string;
}

const LayoutMain: React.FC<LayoutMainProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <MainHeader {...props} />
      <MainSidebar {...props} />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default LayoutMain;
