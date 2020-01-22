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

interface SigninFormProps extends ComponentBaseProps {
  linkSignup?: string;
  linkTerms?: string;
  linkForgetPassword?: string;
  linkPrivacy?: string;
}

const SigninForm: React.FC<SigninFormProps> = (props) => {
  const { linkSignup } = props;
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
              <FormHelperText>
                암호가 기억나지 않는다면 <Link href="/signup">암호를 변경</Link> 하세요.
              </FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <FormButton color="primary" size="large" fullWidth disabled={sent} mounted>
                {sent ? '처리중...' : '로그인'}
              </FormButton>
            </FormControl>

            <FormControl margin="dense">
              <FormControlLabel checked={clipped} control={<Checkbox />} label="암호 저장" />
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

export default SigninForm;
