import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import FormButton from '~/modules/components/FormButton';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: theme.spacing(2),
    },
  }),
);

interface ProjectSettingsStylesFormProps extends ComponentBaseProps {}

const ProjectSettingsStylesForm: React.FC<ProjectSettingsStylesFormProps> = () => {
  const classes = useStyles();
  const [sent, setSent] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth />
          <FormButton color="primary" disabled={sent} mounted>
            {sent ? '처리중...' : '변경 내용 저장'}
          </FormButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProjectSettingsStylesForm;
