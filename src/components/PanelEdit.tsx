import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import FormButton from '~/modules/components/FormButton';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#fff',
      margin: theme.spacing(0),
    },
    form: {
      margin: theme.spacing(2),
      minHeight: '300px',
    },
  }),
);

interface EditDocumentProps extends ComponentBaseProps {}

const EditDocument: React.FC<EditDocumentProps> = () => {
  const classes = useStyles();
  const [sent, setSent] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>{/*  */}</FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditDocument;
