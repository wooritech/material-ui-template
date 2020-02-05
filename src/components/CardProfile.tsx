import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import red from '@material-ui/core/colors/red';
import Divider from '@material-ui/core/Divider';

import FormButton from '~/modules/components/FormButton';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    form: {
      margin: theme.spacing(2),
    },
  }),
);
interface CardProfileProps extends ComponentBaseProps {}

const CardProfile: React.FC<CardProfileProps> = () => {
  const classes = useStyles();
  const [sent, setSent] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="사용자 계정 정보" />
      <Divider light />
      <CardContent>
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
              <FormControl margin="normal" />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardProfile;
