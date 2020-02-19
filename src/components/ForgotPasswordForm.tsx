import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import FormButton from '~/modules/components/FormButton';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(2),
  },
  signup: {
    align: 'center',
    marginTop: theme.spacing(2),
  },
  contentWrapper: {
    margin: '8px 4px',
  },
}));

interface ForgotPasswordFormProps extends ComponentBaseProps {
  linkSignup?: string;
  linkTerms?: string;
  linkForgetPassword?: string;
  linkPrivacy?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
  const { linkSignup } = props;
  const [sent, setSent] = React.useState<boolean>(false);
  const classes = useStyles();

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.contentWrapper}>
          <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
            <FormControl margin="none" fullWidth>
              <TextField
                id="email"
                label="이메일 주소"
                variant="outlined"
                margin="normal"
                disabled={sent}
                size="medium"
                type="email"
                fullWidth
                required
              />
              <FormHelperText>
                사용자 이메일 주소를 입력한 다음 버튼을 누르면 초기화 메일이 발송됩니다.
              </FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <FormButton color="primary" size="large" fullWidth disabled={sent} mounted>
                {sent ? '처리중...' : '암호 초기화 메일 발송'}
              </FormButton>
            </FormControl>
          </form>
        </div>
      </Paper>
      <Typography variant="subtitle2" align="center" className={classes.signup}>
        RealDocs가 처음 이라면
        <Link href={linkSignup}> 새로운 사용자로 등록</Link> 하세요.
      </Typography>
    </>
  );
};

export default ForgotPasswordForm;
