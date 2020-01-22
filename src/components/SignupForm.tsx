import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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

interface SignupFormProps extends ComponentBaseProps {
  linkSigin?: string;
  linkTerms?: string;
  linkPrivacy?: string;
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { linkSigin } = props;
  const [sent, setSent] = React.useState<boolean>(false);

  const classes = useStyles();
  const clipped = true;

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
                id="username"
                label="사용자 아이디"
                variant="outlined"
                margin="normal"
                disabled={sent}
                size="medium"
                fullWidth
                autoFocus
                required
              />
              <TextField
                id="email"
                label="이메일 주소"
                variant="outlined"
                margin="normal"
                disabled={sent}
                size="medium"
                type="email"
                fullWidth
                autoFocus
                required
              />
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
            <FormHelperText>
              숫자와 소문자를 포함하여 15 자 이상 또는 8 자 이상이어야합니다.
            </FormHelperText>
            <FormControl margin="normal" fullWidth>
              <FormButton color="primary" size="large" fullWidth disabled={sent} mounted>
                {sent ? '처리중...' : '사용자 등록'}
              </FormButton>
            </FormControl>

            <FormControl margin="dense">
              <FormControlLabel
                checked={clipped}
                control={<Checkbox />}
                label="개인정보 보호 및 약관에 동의"
              />
              <FormHelperText>
                체크 할 경우
                <Link href="/privacy">개인정보 보호</Link> 및 <Link href="/terms">약관</Link> 에
                동의함을 의미합니다.
              </FormHelperText>
            </FormControl>
          </form>
        </div>
      </Paper>
      <Typography variant="subtitle2" align="center" className={classes.signup}>
        RealDocs 사용자 아이디가 있다면
        <Link href={linkSigin}> 로그인</Link> 하세요.
      </Typography>
    </>
  );
};

export default SignupForm;
