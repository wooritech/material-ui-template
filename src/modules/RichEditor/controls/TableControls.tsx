import React from 'react';
import { EditorState } from 'draft-js';
import { ToolButtons, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';

const TableControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  const handleChange = (value: string) => {
    if (value === 'table') if (onChange) onChange(EditorState.undo(editorState));
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemConfig[]}
      exclusive
      onChange={handleChange}
    />
  );
};

export default TableControls;
