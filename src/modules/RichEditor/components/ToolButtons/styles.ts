import { makeStyles, Theme } from '@material-ui/core/styles';

const buttonStyles = makeStyles((theme: Theme) => ({
  toggleButton: {
    border: 'none',
    height: '32px',
    padding: theme.spacing(0, 0.5),
  },
  icon: {
    fontSize: '1.2rem',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
  startIcon: {
    fontSize: '1.2rem',
    marginRight: theme.spacing(1),
  },
  endIcon: {
    fontSize: '1.2rem',
    marginLeft: theme.spacing(1),
  },
}));

export default buttonStyles;
