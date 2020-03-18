import React from 'react';
import { ToolButtons, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';
import { toggleSelectionAlignment } from '../ContentUtils';

const AlignmentControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  if (!buttonItems)
    throw new Error('AlignmentControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const handleChange = (value: string) => {
    if (onChange) onChange(toggleSelectionAlignment(editorState, value));
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemConfig[]}
      exclusive
      onChange={handleChange}
    />
  );
};

export default AlignmentControls;
