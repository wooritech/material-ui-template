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

  /** 언어 선택 버튼 클릭 이벤트 */
  const handleChange = (value: string) => {
    setSelectedLanguage(value);
    /** config 의 기본 언어와 선택한 언어가 동일한 경우 확장 패널을 닫아준다. */
    const mode = richConfig.defaultLanguage === value ? undefined : 'lang';
    const commandValue = { mode, lang: value };

    if (onRichCommand) onRichCommand('change-language-mode', commandValue);
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
