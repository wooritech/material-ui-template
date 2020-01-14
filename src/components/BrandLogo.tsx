import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const BrandLogo: React.FC = () => {
  return (
    <Typography variant="h6">
      <Link color="inherit" href="/">
        RealDocs
      </Link>
    </Typography>
  );
};

export default BrandLogo;
