/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, Theme } from '@material-ui/core/styles';

const controlStyles = makeStyles((theme: Theme) => ({
  controls: {
    margin: theme.spacing(2),
  },
}));

const buttonStyles = makeStyles(() => ({
  normal: {
    color: 'gray',
  },
  active: {
    color: 'blue',
  },
}));

export { controlStyles, buttonStyles };
