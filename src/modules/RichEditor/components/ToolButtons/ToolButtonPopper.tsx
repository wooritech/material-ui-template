/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { ButtonItemConfig } from './types';
import ToolButtonGroup from './ToolButtonGroup';
import ToolButton from './ToolButton';

const buttonStyles = makeStyles((theme: Theme) => ({
  endIcon: {
    marginLeft: theme.spacing(1),
  },
}));

interface ToolButtonPopperProps {
  buttonItem: ButtonItemConfig | undefined;
  onChange?: (value: any) => void;
  checkSelected?: () => string;
}

/**
 *
 */
const ToolButtonPopper: React.FC<ToolButtonPopperProps> = (props) => {
  const classes = buttonStyles();
  const { onChange, checkSelected, buttonItem } = props;

  if (!buttonItem) throw new Error('buttonItmes 속성은 undefined 가 될 수 없습니다.');

  const { options } = buttonItem;

  if (!options || options.length === 0)
    throw new Error('ButtonItem.option 가 없거나 배열에 항목이 없습니다.');

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLElement>(null);

  // 호출부에서 editorState가 변경될때 호출(hooked)된다.
  const currentValue = checkSelected && checkSelected();
  const currentLabel = () => {
    return options.find((option) => option.value === currentValue)?.label || buttonItem.label;
  };

  const handlePoper = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, value: any) => {
    event.preventDefault();
    setOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <ToolButtonGroup size="small" exclusive aria-label="rich blockstyle" ref={anchorRef}>
      <ToolButton value="" aria-label="" onClick={handlePoper}>
        {currentLabel()}
        <ArrowDropDownIcon className={classes.endIcon} />
      </ToolButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
        style={{ zIndex: 10000 }}
      >
        {({ TransitionProps, placement }) => {
          return (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {buttonItem.options?.map((option) => (
                      <MenuItem
                        key={option.label}
                        selected={option.value === currentValue}
                        onClick={(event) => handleMenuItemClick(event, option.value)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          );
        }}
      </Popper>
    </ToolButtonGroup>
  );
};

export default ToolButtonPopper;
