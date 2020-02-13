import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
  logo: {
    height: 42,
  },
}));

interface BrandLogoProps {
  imageName?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = (props) => {
  const { imageName = 'logo.svg' } = props;
  const classes = useStyles();
  return (
    <Typography variant="h5">
      <Link color="inherit" href="/">
        <img
          // src="/images/logo-title-blue-noboarder-camel.png"
          src={`/images/${imageName}`}
          alt="Real Document Director"
          className={classes.logo}
        />
      </Link>
    </Typography>
  );
};

export default BrandLogo;
