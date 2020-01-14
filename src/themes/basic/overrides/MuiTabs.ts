import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export default {
  root: {
    marginLeft: theme.spacing(1),
  },
  indicator: {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: theme.palette.common.white,
  },
};
