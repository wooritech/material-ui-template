import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { ComponentBaseProps } from './types';

export interface CopyrightProps extends ComponentBaseProps {}

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.wooritech.com">
        Wooritech Inc.
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
