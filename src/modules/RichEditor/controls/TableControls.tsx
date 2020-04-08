import React from 'react';
import { ToolButtons, ButtonItemConfig } from '../components';
import { EditorControlsProps } from './types';
import { TableUtils } from '../utils';

const TableControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;

  const handleChange = (value: string) => {
    const state = TableUtils.insertTable(editorState);
    if (value === 'table') if (onChange) onChange(state);
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
