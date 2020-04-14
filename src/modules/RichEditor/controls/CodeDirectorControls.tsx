import React from 'react';
import { EditorState } from 'draft-js';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';

const CodeDirectorControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  const handleChange = (value: string) => {
    if (value === 'code-director') if (onChange) onChange(EditorState.undo(editorState));
  };

  return (
    <ToolButtons buttonItems={buttonItems as ButtonItemType[]} exclusive onChange={handleChange} />
  );
};

export default CodeDirectorControls;
