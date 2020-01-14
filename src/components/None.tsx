import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    background: 'white',
    minHeight: 200,
  },
});

const None = () => {
  const classes = useStyles();
  return <Grid container className={classes.root} />;
};

export default None;
