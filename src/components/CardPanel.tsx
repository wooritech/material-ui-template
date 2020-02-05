import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import { ComponentBaseProps } from './types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
  }),
);
interface CardPanelProps extends ComponentBaseProps {
  headerTitle: string;
}

const CardPanel: React.FC<CardPanelProps> = (props) => {
  const { headerTitle, children } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={headerTitle} />
      <Divider light />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardPanel;
