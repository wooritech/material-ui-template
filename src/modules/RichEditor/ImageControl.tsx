import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DropperModal } from '~/modules/FileDropper';
import ToolButton from './ToolButton';
import { EditorControlsProps } from './types';
import ContentUtils from './ContentUtils';

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginTop: theme.spacing(0),
  },
}));

const ImageControl: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleImageImage = (files: string[]) => {
    if (files && files.length > 0) {
      // eslint-disable-next-line array-callback-return
      files.map((file) => {
        if (onChange) onChange(ContentUtils.insertImage(editorState, file));
      });
    }
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown', files: string[]) => {
    setOpen(false);
    handleImageImage(files);
  };

  const imageButton = { label: 'Images', style: 'images', icon: 'add_photo_alternate' };

  return (
    <div className={classes.controls}>
      <ToolButton
        key={imageButton.label}
        active={false}
        label={imageButton.label}
        onClick={handleOpen}
        style={imageButton.style}
        icon={imageButton.icon}
      />
      <DropperModal open={open} onClose={handleClose} />
    </div>
  );
};

export default ImageControl;
