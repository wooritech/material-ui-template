/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageMedia from './ImageMedia';
import { ToolButtons } from '../ToolButtons';
import { BlockComponentProps } from '../types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    // outline: 'none',
    // height: '200px',
  },
  focused: {
    // backgroundColor: '#eee',
    // border: '0.12rem dashed #a0a0a0',
  },
  toolbutton: {
    pointerEvents: 'auto',
    marginTop: '5px',
  },
}));

const buttons = [
  { label: 'Left', value: 'left', icon: 'format_align_left' },
  { label: 'center', value: 'center', icon: 'format_align_center' },
  { label: 'right', value: 'right', icon: 'format_align_right' },
];

/** Media */
const Media: React.FC<BlockComponentProps> = (props) => {
  const classes = useStyles();
  const { block, blockProps, contentState } = props;
  const [focused, setFocused] = React.useState('blur');
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, name, size } = entity.getData();
  const type = entity.getType();

  const handleFocused = (e: React.FocusEvent) => {
    const fType = e.type;
    setFocused(fType);
    /** 포커스로 하는게 아니라 block type을 가지고 해야 겠다. */
    // if (fType === 'blur') blockProps.onRichCommand('change-ext-mode', undefined);
    if (fType === 'focus') blockProps.onRichCommand('select-block', { block });
  };

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
    <div className={`${classes.root}`}>
      <div
        tabIndex={0}
        onFocus={handleFocused}
        onBlur={handleFocused}
        className={`public-DraftStyleDefault-ltr ${focused === 'focus' ? classes.focused : ''}`}
      >
        {type === 'image' ? <ImageMedia src={src} name={name} size={size} {...props} /> : null}
      </div>
      {focused === 'focus' ? (
        <div className={classes.toolbutton}>
          <ToolButtons
            buttonItems={buttons}
            checkSelected={handleSelected}
            exclusive
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Media;
