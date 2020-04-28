/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BlockComponentProps } from '../types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '200px',
    border: '0.12rem dashed #a0a0a0',
  },
  focused: {
    backgroundColor: '#eee',
  },
}));

const RichRealGrid: React.FC<BlockComponentProps> = (props) => {
  const classes = useStyles();
  const { block, blockProps } = props;
  const [focused, setFocused] = React.useState('blur');

  const handleFocused = (e: React.FocusEvent) => {
    const fType = e.type;
    setFocused(fType);
    /** 포커스로 하는게 아니라 block type을 가지고 해야 겠다. */
    // if (fType === 'blur') blockProps.onRichCommand('change-ext-mode', undefined);
    if (fType === 'focus') blockProps.onRichCommand('select-block', { block });
  };

  const handleShowExt = () => {
    // blockProps.onRichCommand('change-ext-mode', 'realgrid');
    // blockProps.onRichCommand('select-block', block);
  };

  const handleRemoveClick = () => {
    blockProps.onRichCommand('remove-realgrid', { block });
  };

  return (
    <div
      tabIndex={0}
      onFocus={handleFocused}
      onBlur={handleFocused}
      className={`${classes.root} ${focused === 'focus' ? classes.focused : ''}`}
    >
      <Button onClick={handleShowExt}>RealGrid</Button>
      <Button onClick={handleRemoveClick}>Remove Grid</Button>
    </div>
  );
};

export default RichRealGrid;
