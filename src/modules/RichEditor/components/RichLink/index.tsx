/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { DecoratedComponentProps } from '../types';

const useLinkStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover, &:focus': {
      textDecoration: 'none',
    },
  },
  metaLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover, &:focus': {
      color: '#7eadda',
      outline: 0 /* reset for :focus */,
      cursor: 'pointer',
      textDecoration: 'none',
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
  const classes = useLinkStyles();
  const { offsetKey, children, contentState, entityKey } = props;

  const [isMetaKeyDown, setIsMetaKeyDown] = React.useState(false);

  const link = contentState.getEntity(entityKey).getData();
  const onClick = (e: React.MouseEvent) => {
    /**
     * 편집을 위해 클릭기능은 키보드와 함께 처리하는게 맞지만
     * readonly 일때 클릭을 막아야 할지를 결정해야 한다.
     */
    if (e.metaKey) {
      // console.log(e.metaKey, link);
      window.open(link.url, '_blank');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setIsMetaKeyDown(e.metaKey);
  };

  return (
    <span data-offset-key={offsetKey}>
      <Link
        className={isMetaKeyDown ? classes.metaLink : classes.link}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        /** @TODO 마우스 올라간 상태에서 키보드 동작 구현 keydown, keyup */
      >
        {children}
      </Link>
    </span>
  );
};

export default RichLink;
