/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import SidebarEdit from '~/components/SidebarEdit';
import HeaderEdit from '~/components/HeaderEdit';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.custom.sidebarWidthEdit}px)`,
      marginLeft: theme.custom.sidebarWidthEdit,
    },
    height: '100vh',
  },
  main: {
    padding: theme.spacing(3),
    display: 'flex',
    flex: 1,
    minHeight: '0px',
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
      {/* <HeaderEdit {...props} /> */}
      <SidebarEdit {...props} />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default LayoutEdit;
