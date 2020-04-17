import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles, Theme } from '@material-ui/core/styles';

/**
 * 커스텀 스타일 적용된 툴버튼 그룹
 */
export default withStyles((theme: Theme) => ({
  root: {
    height: '40px',
  },
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);
