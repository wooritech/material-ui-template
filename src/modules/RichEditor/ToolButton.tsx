/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ToolButtonProps } from './types';

const buttonStyles = makeStyles(() => ({
  normal: {
    color: 'gray',
  },
  active: {
    color: 'blue',
  },
}));

const ToolButton: React.FC<ToolButtonProps> = (props) => {
  const classes = buttonStyles();
  const { active, label, onToggle, style, icon, onClick } = props;
  const onToggleEvent = (event: Event) => {
    event.preventDefault();
    if (onToggle) onToggle(style);
    // console.log(event);
  };
  const onClickEvent = (event: MouseEvent) => {
    if (onClick) onClick(event);
  };

  return (
    <>
      {icon ? (
        <IconButton
          onClick={(e) => onClickEvent(e as any)}
          className={active ? classes.active : classes.normal}
          onMouseDown={(e) => onToggleEvent(e as any)}
          tabIndex={0}
        >
          <Icon>{icon}</Icon>
        </IconButton>
      ) : (
        <Button
          variant="text"
          onClick={(e) => onClickEvent(e as any)}
          className={active ? classes.active : classes.normal}
          onMouseDown={(e) => onToggleEvent(e as any)}
          tabIndex={0}
        >
          {label}
        </Button>
      )}
    </>
  );
};

export default ToolButton;
