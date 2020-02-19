import { makeStyles } from '@material-ui/core/styles';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles(() => ({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export interface BlankLayoutProps extends LayoutBaseProps {}

const BlankLayout: React.FC<BlankLayoutProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <main>{children}</main>
    </div>
  );
};

export default BlankLayout;
