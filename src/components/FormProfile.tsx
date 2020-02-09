import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import FormButton from '~/modules/components/FormButton';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: theme.spacing(2),
    },
  }),
);

interface FormProfileProps extends ComponentBaseProps {}

const FormProfile: React.FC<FormProfileProps> = () => {
  const classes = useStyles();
  const [sent, setSent] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="username"
              label="사용자 아이디"
              variant="outlined"
              margin="normal"
              value="onlydel"
              disabled={sent}
              autoFocus
              required
            />
            <TextField
              id="email"
              label="이메일 주소"
              variant="outlined"
              margin="normal"
              disabled={sent}
              type="email"
              value="onlydel@wooritech.com"
              required
            />
            <TextField
              id="name"
              label="이름"
              variant="outlined"
              margin="normal"
              disabled={sent}
              value="홍길동"
              required
            />
          </FormControl>
          <FormButton color="primary" disabled={sent} mounted>
            {sent ? '처리중...' : '변경 내용 저장'}
          </FormButton>
          <FormButton color="default" disabled={false} mounted href="/forgotPassword">
            암호 변경
          </FormButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormProfile;
