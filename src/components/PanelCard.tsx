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
    paddingNone: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
  }),
);

interface PanelCardProps extends ComponentBaseProps {
  headerTitle: string;
  showHeaderDivider?: boolean;
  paddingNone?: boolean;
}

const PanelCard: React.FC<PanelCardProps> = (props) => {
  const { headerTitle, children, showHeaderDivider = true, paddingNone } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={headerTitle} />
      {showHeaderDivider ? <Divider light /> : null}
      <CardContent className={paddingNone ? classes.paddingNone : ''}>{children}</CardContent>
    </Card>
  );
};

export default PanelCard;
