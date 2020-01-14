import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ComponentBaseProps } from '~/components/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    margin: theme.spacing(1, 1),
  },
}));

interface Props extends ComponentBaseProps {
  children?: React.ReactElement;
}

const HomePage: React.FC<Props> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>{children}</div>
    </>
  );
};

export default HomePage;
