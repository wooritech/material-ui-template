import React from 'react';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';

/** 미리 정의된 컨트롤이 없는 경우 기본 컨트롤로 사용 */
const BlankControls: React.FC<EditorControlsProps> = (props) => {
  const { buttonItems } = props;

  const handleChange = (value: string) => {
    console.log(
      `이 컨트롤은 BlankControls 이며 구현된 컨트롤이 없어서 임시로 실행된 컨트롤 입니다. value: ${value}`,
    );
  };

  return (
    <ToolButtons buttonItems={buttonItems as ButtonItemType[]} exclusive onChange={handleChange} />
  );
};

export default BlankControls;
