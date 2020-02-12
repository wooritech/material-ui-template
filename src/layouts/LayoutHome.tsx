/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Copyright from '~/components/Copyright';
import HeaderHome from '~/components/HeaderHome';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.pageWidthHome,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  main: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing(2),
  },
}));

export interface LayoutHomeProps extends LayoutBaseProps {}

const LayoutHome: React.FC<LayoutHomeProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <HeaderHome {...props} />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default LayoutHome;
