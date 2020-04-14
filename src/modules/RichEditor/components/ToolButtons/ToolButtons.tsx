/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToolButtonGroup from './ToolButtonGroup';
import ToolButtonIcon from './ToolButtonIcon';
import { ButtonItemType } from './types';

interface ToolButtonProps {
  buttonItems: ButtonItemType[];
  // onToggle?: (blockType: string) => void;
  // onClick?: (event: MouseEvent) => void;
  exclusive: boolean | undefined;
  onChange?: (value: any) => void;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  defaultValue?: any;
  buttonComponent?: any;
  checkSelected?: (value: any) => boolean;
}

/**
 * 그룹화 툴 버튼을 만들어 준다. @interface ButtonItemType 타입을 만들어 넘겨주어야 한다.
 * @param props ToolButtonProps
 */
const ToolButtons: React.FC<ToolButtonProps> = (props) => {
  const {
    buttonItems,
    exclusive,
    defaultValue,
    setValue,
    onChange,
    checkSelected,
    buttonComponent,
  } = props;

  // const handleClick = (event: MouseEvent, value: any) => {
  //   event.preventDefault();
  //   // console.log(event);
  //   if (onClick) onClick(value);
  // };

  // onClick() or onMouseDown() 에 핸들러가 매핑되어 있으면 onChange()이벤트는 발생하지 않는다.
  // 여기서 onChange를 처리하면 에디터에서 포커스가 사라진다.
  // handleToggle에서 처리하면 포커스가 남아있다. event.preventDefault()와 관계없다.
  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    if (setValue) setValue(value);
  };

  const handleToggle = (event: React.MouseEvent, value: any) => {
    event.preventDefault();
    if (onChange) onChange(value);
  };

  return (
    <ToolButtonGroup
      size="small"
      value={defaultValue}
      exclusive={exclusive}
      aria-label="rich blockstyle"
      onChange={handleChange}
    >
      {buttonItems.map((item, index) => {
        return (
          <ToggleButton
            style={{ border: 'none' }}
            onMouseDown={(e: React.MouseEvent) => handleToggle(e, item.value)}
            value={item.value}
            selected={checkSelected ? checkSelected(item.value) : undefined}
            key={index.toString()}
            component={buttonComponent}
          >
            {/* 
            - [ ] REFACTORING
            */}
            <ToolButtonIcon icon={item.startIcon} position="startIcon" />
            <ToolButtonIcon icon={item.icon} position="icon" />
            {!item.icon ? item.label : null}
            <ToolButtonIcon icon={item.endIcon} position="endIcon" />
          </ToggleButton>
        );
      })}
    </ToolButtonGroup>
  );
};

export default ToolButtons;
