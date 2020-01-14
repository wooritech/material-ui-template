import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 240,
    height: 64,
  },
  logo: {
    height: 36,
  },
}));

const BrandLogo: React.FC = () => {
  const classes = useStyles();
  return (
    <Typography variant="h5">
      <Link color="inherit" href="/">
        <img
          src="/images/logo-title-blue-noboarder-camel.png"
          alt="Real Document Director"
          className={classes.logo}
        />
      </Link>
    </Typography>
  );
};

export default BrandLogo;
