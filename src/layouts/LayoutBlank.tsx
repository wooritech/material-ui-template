import { makeStyles } from '@material-ui/core/styles';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles(() => ({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export interface LayoutBlankProps extends LayoutBaseProps {}

const LayoutBlank: React.FC<LayoutBlankProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <main>{children}</main>
    </div>
  );
};

export default LayoutBlank;
