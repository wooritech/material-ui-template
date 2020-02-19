/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Copyright from '~/components/Copyright';
import LandingHeader from '~/components/LandingHeader';
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

export interface LandingLayoutProps extends LayoutBaseProps {}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <LandingHeader {...props} />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default LandingLayout;
