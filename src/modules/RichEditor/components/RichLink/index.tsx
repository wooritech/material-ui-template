/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';
import { DecoratedComponentProps } from '../types';

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

/**
 * 에디터에 표시할 링크 데코레이터
 * @param props
 */
const RichLink: React.FC<DecoratedComponentProps> = (props) => {
  const { offsetKey, children, contentState, entityKey } = props;
  const classes = useLinkStyles();
  const link = contentState.getEntity(entityKey).getData();
  const onClick = () => {
    // console.log(link);
    window.open(link.url, '_blank');
  };

  return (
    <span className={classes.link} data-offset-key={offsetKey}>
      <a onClick={onClick}>{children}</a>
    </span>
  );
};

export default RichLink;
