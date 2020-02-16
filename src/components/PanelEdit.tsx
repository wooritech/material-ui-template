import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { ComponentBaseProps } from './types';
import RichEditor from '~/modules/components/RichEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#fff',
      margin: theme.spacing(2),
      flex: 1,
      overflow: 'hidden',
      boxShadow: '0px 0px 5px 3px #ddd',
      borderRadius: '5px',
      // height: `calc(100vh - ${theme.spacing(2) - theme.custom.headerHeightEdit}px)`,
    },
  }),
);

interface PanelEditProps extends ComponentBaseProps {}

const PanelEdit: React.FC<PanelEditProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} square>
        <RichEditor />
      </Paper>
    </div>
  );
};

export default PanelEdit;
