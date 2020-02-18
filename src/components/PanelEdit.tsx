import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { ComponentBaseProps } from './types';
import RichEditor from '~/modules/components/RichEditor';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      background: '#fff',
      overflow: 'hidden',
      boxShadow: '0px 0px 5px 3px #ddd',
      borderRadius: '5px',
    },
  }),
);

interface PanelEditProps extends ComponentBaseProps {}

const PanelEdit: React.FC<PanelEditProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RichEditor />
    </div>
  );
};

export default PanelEdit;
