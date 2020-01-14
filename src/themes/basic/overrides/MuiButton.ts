import { ButtonClassKey } from '@material-ui/core/Button';
import { StyleRules } from '@material-ui/core/styles/withStyles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

const MuiButton: Partial<StyleRules<ButtonClassKey>> = {
  label: {
    textTransform: 'none',
  },
  contained: {
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none',
    },
  },
  sizeSmall: {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
  },
  sizeLarge: {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(16),
  },
};

export default MuiButton;
