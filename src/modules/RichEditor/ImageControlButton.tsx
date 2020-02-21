import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ToolButton from './ToolButton';
import { EditorControlsProps } from './types';
import { DropperModal } from '../FileDropper';

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginTop: theme.spacing(0),
  },
}));

const ImageControlButton: React.FC<EditorControlsProps> = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageButton = { label: 'Images', style: 'images' };

  return (
    <div className={classes.controls}>
      <ToolButton
        key={imageButton.label}
        active={false}
        label={imageButton.label}
        onClick={handleOpen}
        style={imageButton.style}
      />
      <DropperModal open={open} onClose={handleClose} />
    </div>
  );
};

export default ImageControlButton;
