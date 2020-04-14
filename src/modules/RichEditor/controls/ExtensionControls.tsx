import React from 'react';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';

const ExtensionControls: React.FC<EditorControlsProps> = (props) => {
  const { buttonItems, onRichCommand, richConfig } = props;

  if (!buttonItems)
    throw new Error('ExtensionControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const handleSelected = (value: string) => {
    return richConfig.extension === value;
  };

  const handleChange = (value: string) => {
    if (onRichCommand) onRichCommand('change-ext-mode', handleSelected(value) ? undefined : value);
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemType[]}
      checkSelected={handleSelected}
      exclusive
      onChange={handleChange}
    />
  );
};

export default ExtensionControls;
