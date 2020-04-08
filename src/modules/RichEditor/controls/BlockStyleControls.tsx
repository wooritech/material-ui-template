/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RichUtils } from 'draft-js';
import { ToolButtons, ButtonItemConfig } from '../components';
import { EditorControlsProps } from './types';

const BlockStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  if (!buttonItems)
    throw new Error('BlockStyleControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const [selectedStyle, setStyle] = React.useState('');
  const selection = editorState.getSelection();
  const isBlockType = (value: any): boolean => {
    return (
      editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType() === value
    );
  };

  const handleChange = (value: string) => {
    if (onChange) onChange(RichUtils.toggleBlockType(editorState, value));
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemConfig[]}
      checkSelected={isBlockType}
      defaultValue={selectedStyle}
      setValue={setStyle}
      exclusive={false}
      onChange={handleChange}
    />
  );
};

export default BlockStyleControls;
