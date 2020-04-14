import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const buttonStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
  startIcon: {
    marginRight: theme.spacing(1),
  },
  endIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export interface ToolButtonIconProps {
  icon: React.ReactElement | string | undefined;
  position: 'startIcon' | 'endIcon' | 'icon';
}

const ToolButtonIcon: React.FC<ToolButtonIconProps> = (props) => {
  const classes = buttonStyles();
  const { icon, position } = props;

  return icon ? <Icon className={classes[position]}>{icon}</Icon> : null;
};

export default ToolButtonIcon;
