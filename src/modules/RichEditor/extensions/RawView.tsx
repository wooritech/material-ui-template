import { RichEditorState } from '../modules';

/** RawViewProps */
interface RawViewProps {
  editorState: RichEditorState;
}

/**
 * RawView Extension
 */
const RawView: React.FC<RawViewProps> = (props) => {
  const { editorState } = props;
  const contents = RichEditorState.editorStateToRawString(editorState);
  return <pre>{contents}</pre>;
};

export default RawView;
