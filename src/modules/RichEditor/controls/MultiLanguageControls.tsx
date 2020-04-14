import React from 'react';
import { ToolButtonPopper, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';

const MultiLanguageControls: React.FC<EditorControlsProps> = (props) => {
  const { onRichCommand, buttonItems, richConfig } = props;

  const [selectedLanguage, setSelectedLanguage] = React.useState(() => {
    return richConfig.currentLanguage;
  });
  const isSelectedLanguage = (): string => {
    return selectedLanguage;
  };

  const handleChange = (value: string) => {
    if (richConfig.defaultLanguage === value || richConfig.currentLanguage === value) {
      setSelectedLanguage(richConfig.defaultLanguage);
      if (onRichCommand) onRichCommand('change-default-language', value);
      return;
    }

    setSelectedLanguage(value);
    if (onRichCommand) onRichCommand('change-editing-language', value);
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
