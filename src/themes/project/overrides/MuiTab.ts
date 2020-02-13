import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export default {
  root: {
    // textTransform: 'none',
    margin: '0 16px',
    minWidth: 0,
    padding: 0,
    [theme.breakpoints.up('md')]: {
      padding: 0,
      minWidth: 0,
    },
  },
};
