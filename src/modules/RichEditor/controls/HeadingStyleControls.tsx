/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RichUtils } from 'draft-js';
import { ToolButtonPopper, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';

const HeadingStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  const selection = editorState.getSelection();
  const getBlockType = (): string => {
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  };

  const handleChange = (value: string) => {
    if (onChange) onChange(RichUtils.toggleBlockType(editorState, value));
  };

  return (
    <ToolButtonPopper
      buttonItem={buttonItems as ButtonItemConfig}
      checkSelected={getBlockType}
      onChange={handleChange}
    />
  );
};

export default HeadingStyleControls;
