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
      overflow: 'auto',
      // height: `calc(100vh - ${theme.spacing(2) - theme.custom.headerHeightEdit}px)`,
    },
    editor: {
      minHeight: '100px',
      backgroundColor: '#eee',
      // border: '1px solid',
      // height: '2000px',
      padding: '20px',
    },
  }),
);

interface EditDocumentProps extends ComponentBaseProps {}

const EditDocument: React.FC<EditDocumentProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} square className={classes.editor}>
        <RichEditor />
      </Paper>
    </div>
  );
};

export default EditDocument;
