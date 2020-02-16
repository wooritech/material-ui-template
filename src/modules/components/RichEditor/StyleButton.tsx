/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { StyleButtonProps } from './types';

const buttonStyles = makeStyles(() => ({
  normal: {
    color: 'gray',
  },
  active: {
    color: 'blue',
  },
}));

const StyleButton: React.FC<StyleButtonProps> = (props) => {
  const classes = buttonStyles();
  const { active, label, onToggle, style } = props;
  const onToggleEvent = (event: Event) => {
    event.preventDefault();
    onToggle(style);
    // console.log(event);
  };

  return (
    <Button
      variant="text"
      className={active ? classes.active : classes.normal}
      onMouseDown={(e) => onToggleEvent(e as any)}
      tabIndex={0}
    >
      {label}
    </Button>
  );
};

export default StyleButton;
