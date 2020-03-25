/* eslint-disable react/no-danger */
import { RichEditorState } from '../modules';
import { Converter } from '../utils';

/** RichEditorPreviewProps */
interface RichEditorPreviewProps {
  editorState: RichEditorState;
}

/** PreviewExtension */
const Preview: React.FC<RichEditorPreviewProps> = (props) => {
  const { editorState } = props;
  const contents = Converter.convertToHTML(editorState);

  return (
    <div style={{ display: 'block' }}>
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  );
};

export default Preview;
