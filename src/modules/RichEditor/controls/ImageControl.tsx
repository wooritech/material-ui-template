/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { DropperModal } from '~/modules/FileDropper';
import { ToolButtons, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';
import ContentUtils from '../ContentUtils';

const ImageControl: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedStyle, setStyle] = React.useState('');

  if (!buttonItems)
    throw new Error('InlineStyleControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const handleOpen = () => {
    setOpen(true);
  };

  // 이미지 컨트롤이 있는지 확인해서 버튼이 active 되도록 한다.
  const currentStyle = editorState.getCurrentInlineStyle();
  const hasStyle = (value: any): boolean => {
    return currentStyle.has(value);
  };

  const handleImageImage = (files: string[]) => {
    if (files && files.length > 0) {
      files.map((file) => {
        if (onChange) onChange(ContentUtils.insertImage(editorState, file));
      });
    }
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown', files: string[]) => {
    setOpen(false);
    handleImageImage(files);
  };

  return (
    <div>
      <ToolButtons
        buttonItems={buttonItems as ButtonItemConfig[]}
        checkSelected={hasStyle}
        defaultValue={selectedStyle}
        setValue={setStyle}
        exclusive={false}
        onChange={handleOpen}
      />
      <DropperModal open={open} onClose={handleClose} />
      {/* <ToolButton
        // key={imageButton.label}
        // active={false}
        // label={imageButton.label}
        // onClick={handleOpen}
        // style={imageButton.style}
      />
      <DropperModal open={open} onClose={handleClose} /> */}
    </div>
  );
};

export default ImageControl;
