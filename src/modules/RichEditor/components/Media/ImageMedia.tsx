import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/** Popover는  modal 을 기반하로 하기 때문에 focus 처리에 어려움이 있다.
 *
 * 어쨋든 마우스가 툴바에 올라오면 editor selection이 clear 되는 문제가 있다. */
import Popover from '@material-ui/core/Popover';
import { ToolButtons } from '../ToolButtons';
import { DraftBlockComponentProps } from '../types';

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: 0,
    backgroundColor: 'block',
  },
  button: {
    pointerEvents: 'auto',
  },
}));

const buttons = [
  { label: 'Left', value: 'left', icon: 'format_align_left' },
  { label: 'center', value: 'center', icon: 'format_align_center' },
  { label: 'right', value: 'right', icon: 'format_align_right' },
];

interface ImageMediaProps extends DraftBlockComponentProps {
  src: string;
  name: string;
  size: number;
}

const ImageMedia: React.FC<ImageMediaProps> = (props) => {
  const classes = useStyles();
  const { src, name, block, blockProps, contentState } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  let needTools = false;

  const handleMouseMove = () => {
    // console.log('img, mouse move');
    needTools = true;
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('img, mouse over');
    if (!needTools) {
      needTools = true;
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    needTools = false;

    /** 타켓을 벗어나서 툴바로 올라간 경우 툴바를 유지한다. */
    setTimeout(() => {
      if (!needTools) {
        // console.log('img, mouse leave');
        setAnchorEl(null);
      }
    }, 200);
  };

  const handleEnterToolbar = () => {
    // console.log('img, toober enter');
    needTools = true;
  };

  const handleLeaveToolbar = () => {
    needTools = false;

    /** 툴바를 벗어나서 타켓 엘리멘트로 올라간 경우 툴바를 유지한다. */
    setTimeout(() => {
      if (!needTools) {
        // console.log('img, toober leave');
        setAnchorEl(null);
      }
    }, 200);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'toolbar-popover' : undefined;

  const handleChange = (newValue: string) => {
    if (blockProps?.onRichCommand) {
      /** command 는 EventRichCommand 타입으로 blockRendererFn 호출시 넣어준다. */
      blockProps.onRichCommand('change-img-align', {
        contentState,
        block,
        align: newValue,
      });
    }
  };

  const handleSelected = (selected: string) => {
    const align = block.getData().toJS();
    return align?.textAlign === selected;
  };

  return (
    <>
      <img
        onMouseEnter={handleMouseOver}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        src={src}
        alt={name}
        aria-describedby={id}
      />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        /** 앵커 위치값을 무엇으로 참조 할 것인가? 'anchorEl' | 'anchorPosition' | 'none' */
        anchorReference="anchorEl"
        /** 앵커 위치: 윈도우에서 위치값. */
        // anchorPosition={{ left: 100, top: 100 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        /** Popper는 Modal을 base로 한다.:  벗어날때 포커스 처리 방식,
         * 이 값을 false로 하면 Editor에 포커스가 이동하면서 첫 줄로 이동하게 된다. */
        disableRestoreFocus
        onMouseEnter={handleEnterToolbar}
        onMouseLeave={handleLeaveToolbar}
      >
        <div className={classes.button}>
          <ToolButtons
            buttonItems={buttons}
            checkSelected={handleSelected}
            exclusive
            onChange={handleChange}
          />
        </div>
      </Popover>
    </>
  );
};

export default ImageMedia;

/*

- [ ] Scroll 처리를 위해 Popper로 변경 필요
- [ ] timer로 처리한 delay를 수정할 필요가 있다.??
- [ ] 툴바 전면 수정이 필요해 보인다.

*/
