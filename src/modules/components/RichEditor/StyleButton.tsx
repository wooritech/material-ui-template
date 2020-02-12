/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@material-ui/core';
import { StyleButtonProps } from './types';
import { buttonStyles } from './styles';

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
