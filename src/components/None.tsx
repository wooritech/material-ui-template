import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    // display: 'flex',
    // minHeight: '100vh',
    minHeight: 2020,
  },
});

const None = () => {
  const classes = useStyles();
  return <Grid container className={classes.root} />;
};

export default None;
