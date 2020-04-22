import { makeStyles } from '@material-ui/core/styles';
import { RichEditorState } from '../modules';

const useStyles = makeStyles(() => ({
  pre: {
    overflow: 'auto',
    margin: '0',
    color: '#eee',
    fontSize: '1.3em',
    backgroundColor: '#0d0d0d',
  },
}));

/** RawViewProps */
interface RawViewProps {
  editorState: RichEditorState;
}

/**
 * RawView Extension
 */
const RawView: React.FC<RawViewProps> = (props) => {
  const classes = useStyles();
  const { editorState } = props;
  const contents = RichEditorState.editorStateToRawString(editorState);
  return <pre className={classes.pre}>{contents}</pre>;
};

export default RawView;
