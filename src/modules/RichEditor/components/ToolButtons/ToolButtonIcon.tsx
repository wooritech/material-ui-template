import React from 'react';
import Icon from '@material-ui/core/Icon';
import buttonStyles from './styles';

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
