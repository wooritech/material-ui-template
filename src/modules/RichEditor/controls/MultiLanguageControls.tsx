import React from 'react';
import { ToolButtonPopper, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';

const MultiLanguageControls: React.FC<EditorControlsProps> = (props) => {
  const { onRichCommand, buttonItems } = props;

  const [selectedLanguage, setSelectedLanguage] = React.useState('');
  const isSelectedLanguage = (): string => {
    return selectedLanguage;
  };

  const handleChange = (value: string) => {
    if (onRichCommand) onRichCommand('change-editing-language', value);
    // if (onChange) onChange(RichUtils.toggleBlockType(editorState, value));
  };

  return (
    <ToolButtonPopper
      buttonItem={buttonItems as ButtonItemType}
      checkSelected={isSelectedLanguage}
      onChange={handleChange}
    />
  );
};

export default MultiLanguageControls;
