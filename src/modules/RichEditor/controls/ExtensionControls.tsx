import React from 'react';
import { ToolButtons, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';

const ExtensionControls: React.FC<EditorControlsProps> = (props) => {
  const { buttonItems, onRichCommand, toolbarState } = props;

  if (!buttonItems)
    throw new Error('ExtensionControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const handleSelected = (value: string) => {
    return toolbarState.extension === value;
  };

  const handleChange = (value: string) => {
    if (onRichCommand) onRichCommand('change-ext-mode', value);
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemConfig[]}
      checkSelected={handleSelected}
      exclusive
      onChange={handleChange}
    />
  );
};

export default ExtensionControls;
