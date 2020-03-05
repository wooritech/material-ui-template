import { RichEditorState } from './RichEditorState';

/**
 * RichEditorRawViewerProps propery interface
 */
interface RichEditorRawViewerProps {
  editorState: RichEditorState;
}

/**
 * RichEditor의 state를 넘겨주면 편집 내용을 raw to string 으로 돌려준다.
 * @param props RichEditorRawViewerProps
 */
const RichEditorRawViewer: React.FC<RichEditorRawViewerProps> = (props) => {
  const { editorState } = props;
  const contents = RichEditorState.editorStateToRow(editorState);
  return <pre>{contents}</pre>;
};

export default RichEditorRawViewer;
