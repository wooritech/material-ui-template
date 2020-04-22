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

/** RawViewExtensionProps */
interface RawViewExtensionProps {
  editorState: RichEditorState;
}

/**
 * RawViewExtension
 */
const RawViewExtension: React.FC<RawViewExtensionProps> = (props) => {
  const classes = useStyles();
  const { editorState } = props;
  const contents = RichEditorState.editorStateToRawString(editorState);
  return <pre className={classes.pre}>{contents}</pre>;
};

export default RawViewExtension;
