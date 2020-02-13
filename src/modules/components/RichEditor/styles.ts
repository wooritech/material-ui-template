/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, Theme } from '@material-ui/core/styles';

const controlStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginTop: theme.spacing(0),
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

const editorStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100px',
    backgroundColor: '#eee',
    margin: theme.spacing(0),
  },
  editor: {
    margin: theme.spacing(2),
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
  },
}));

export { controlStyles, buttonStyles, editorStyles };
