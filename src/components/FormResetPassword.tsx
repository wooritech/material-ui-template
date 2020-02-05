import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormButton from '~/modules/components/FormButton';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    margin: theme.spacing(2),
  },
  signup: {
    align: 'center',
    marginTop: theme.spacing(2),
  },
  paper: {
    margin: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  contentWrapper: {
    margin: '8px 4px',
  },
}));

interface FormResetPasswordProps extends ComponentBaseProps {}

const FormResetPassword: React.FC<FormResetPasswordProps> = () => {
  const [sent, setSent] = React.useState<boolean>(false);

  const classes = useStyles();

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
            <FormControl margin="none" fullWidth>
              <TextField
                id="password"
                label="암호"
                variant="outlined"
                type="password"
                margin="normal"
                autoComplete="current-password"
                disabled={sent}
                required
                fullWidth
              />
              <TextField
                id="passwordConfirm"
                label="암호 확인"
                variant="outlined"
                type="password"
                margin="normal"
                autoComplete="current-password"
                disabled={sent}
                required
                fullWidth
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <FormButton color="primary" size="large" fullWidth disabled={sent} mounted>
                {sent ? '처리중...' : '암호 변경'}
              </FormButton>
            </FormControl>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default FormResetPassword;
