import React from 'react';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';
import { ContentUtils } from '../utils';

const AlignmentControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  if (!buttonItems)
    throw new Error('AlignmentControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const handleChange = (value: string) => {
    if (onChange) onChange(ContentUtils.toggleSelectionAlignment(editorState, value));
  };

  return (
    <ToolButtons buttonItems={buttonItems as ButtonItemType[]} exclusive onChange={handleChange} />
  );
};

export default AlignmentControls;
