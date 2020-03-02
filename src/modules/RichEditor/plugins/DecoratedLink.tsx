/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import useLinkStyles from './styles';

/**
 * 에디터에 표시할 링크 데코레이터
 * @param props
 */
const DecoratedLink: React.FC = (props: any) => {
  const { offsetKey, children } = props;
  const classes = useLinkStyles();
  const onClick = () => {
    // console.log(children, e);
  };

  // console.log(props);

  return (
    <span className={classes.link} data-offset-key={offsetKey}>
      <a onClick={onClick}>{children}</a>
    </span>
  );
};

export default DecoratedLink;
