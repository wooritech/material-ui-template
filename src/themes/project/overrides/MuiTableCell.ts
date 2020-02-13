import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export default {
  root: {
    // borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
  head: {
    color: theme.palette.grey[600],
    fontSize: 16,
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    backgroundColor: '#f4f4f4',
  },
  body: {
    fontSize: 16,
  },
};
