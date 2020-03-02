import { makeStyles, Theme } from '@material-ui/core/styles';

const useLinkStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover, &:focus': {
      color: '#7eadda',
      outline: 0 /* reset for :focus */,
      cursor: 'pointer',
    },
    '&:active': {
      color: '#4a7bab',
    },
  },
}));

export default useLinkStyles;
