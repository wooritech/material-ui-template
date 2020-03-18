/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ToolButtonGroup from './ToolButtonGroup';
import ToolButton from './ToolButton';
import { ButtonItemConfig } from './types';

const buttonStyles = makeStyles((theme: Theme) => ({
  normal: {
    color: 'gray',
  },
  active: {
    color: 'blue',
  },
  /**
   * 많이 불편하지만 일단 ToggleToolButton의 내부에 별도의 텍스트 라벨이 들어가는 경우
   * 아이콘의 위치에 따라 일단 아래 두가지 스타일중 나를 선택하도록 한다. */
  startIcon: {
    marginRight: theme.spacing(1),
  },
  endIcon: {
    marginLeft: theme.spacing(1),
  },
}));

interface ToolButtonProps {
  buttonItems: ButtonItemConfig[];
  // onToggle?: (blockType: string) => void;
  // onClick?: (event: MouseEvent) => void;
  exclusive: boolean | undefined;
  onChange?: (value: any) => void;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  defaultValue?: any;
  checkSelected?: (value: any) => boolean;
}

const getIconComponent = (icon?: React.ReactElement | string, className?: string) =>
  icon ? <Icon className={className}>{icon}</Icon> : null;

/**
 * 그룹화 툴 버튼을 만들어 준다. @interface ButtonItemConfig 타입을 만들어 넘겨주어야 한다.
 * @param props ToolButtonProps
 */
const ToolButtons: React.FC<ToolButtonProps> = (props) => {
  const classes = buttonStyles();
  const { buttonItems, exclusive, defaultValue, setValue, onChange, checkSelected } = props;

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

  const handleToggle = (event: React.MouseEvent<HTMLElement>, value: any) => {
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
          <ToolButton
            onMouseDown={(e) => handleToggle(e as any, item.value)}
            value={item.value}
            selected={checkSelected ? checkSelected(item.value) : undefined}
            key={index.toString()}
          >
            {item.startIcon ? getIconComponent(item.startIcon, classes.startIcon) : null}
            {item.icon ? getIconComponent(item.icon) : item.label}
            {item.endIcon ? getIconComponent(item.endIcon, classes.endIcon) : null}
          </ToolButton>
        );
      })}
    </ToolButtonGroup>
  );
};

export default ToolButtons;
