import React from 'react';
import { EditorState } from 'draft-js';
import { ToolButtons, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';

const UndoRedoControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  const handleChange = (value: string) => {
    if (value === 'undo') if (onChange) onChange(EditorState.undo(editorState));
    if (value === 'redo') if (onChange) onChange(EditorState.redo(editorState));
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemConfig[]}
      exclusive
      onChange={handleChange}
    />
  );
};

export default UndoRedoControls;
