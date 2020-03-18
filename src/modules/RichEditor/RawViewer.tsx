import RichEditorState from './RichEditorState';

/**
 * RawViewerProps propery interface
 */
interface RawViewerProps {
  editorState: RichEditorState;
}

/**
 * RichEditor의 state를 넘겨주면 편집 내용을 raw to string 으로 돌려준다.
 * @param props RawViewerProps
 */
const RawViewer: React.FC<RawViewerProps> = (props) => {
  const { editorState } = props;
  const contents = RichEditorState.editorStateToRawString(editorState);
  return <pre>{contents}</pre>;
};

export default RawViewer;
