import React from 'react';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';
import { RealGridUtils } from '../utils';

/** RealGridControls */
const RealGridControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, buttonItems, onRichCommand } = props;

  const handleChange = (value: string) => {
    if (value === 'realgrid') {
      const newState = RealGridUtils.insertGrid(editorState);
      onRichCommand('change-state', newState);
    }
  };

  return (
    <ToolButtons buttonItems={buttonItems as ButtonItemType[]} exclusive onChange={handleChange} />
  );
};

export default RealGridControls;
