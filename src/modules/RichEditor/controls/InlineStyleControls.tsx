/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RichUtils } from 'draft-js';
import { ToolButtons, ButtonItemConfig } from '../components/ToolButtons';
import { EditorControlsProps } from './types';

const InlineStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange, buttonItems } = props;
  const [selectedStyle, setStyle] = React.useState('');

  if (!buttonItems)
    throw new Error('InlineStyleControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  const currentStyle = editorState.getCurrentInlineStyle();
  const hasStyle = (value: any): boolean => {
    return currentStyle.has(value);
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    if (onChange) onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <ToolButtons
      buttonItems={buttonItems as ButtonItemConfig[]}
      checkSelected={hasStyle}
      defaultValue={selectedStyle}
      setValue={setStyle}
      exclusive={false}
      onChange={toggleInlineStyle}
    />
  );
};

export default InlineStyleControls;
