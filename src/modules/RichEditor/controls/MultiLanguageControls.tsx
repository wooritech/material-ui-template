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

  // - TODO REFACTORING
  const handleChange = (value: string) => {
    if (richConfig.defaultLanguage === value || richConfig.currentLanguage === value) {
      setSelectedLanguage(richConfig.defaultLanguage);
      if (richConfig.defaultLanguage !== richConfig.currentLanguage) {
        if (onRichCommand) onRichCommand('close-editing-language', value);
      }
      return;
    }

    if (
      richConfig.defaultLanguage === richConfig.currentLanguage &&
      richConfig.defaultLanguage !== value
    ) {
      setSelectedLanguage(value);
      if (onRichCommand) onRichCommand('open-editing-language', value);
      return;
    }

    if (richConfig.currentLanguage !== value) {
      setSelectedLanguage(value);
      if (onRichCommand) onRichCommand('change-editing-language', value);
    }
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
