import React from 'react';
import { markdownToDraft } from 'markdown-draft-js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { RichEditorState } from '../modules';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
  pre: {
    fontSize: '1.3em',
  },
}));

/** RichEditorPreviewProps */
interface RichEditorMarkdownProps {
  editorState: RichEditorState;
  onStateChange: (eidtorState: RichEditorState) => void;
}

/** PreviewExtension */
const Markdown: React.FC<RichEditorMarkdownProps> = (props) => {
  const { editorState, onStateChange } = props;
  const classes = useStyles();
  const [mdText, setMdText] = React.useState('');

  const handleChangeMd = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target as HTMLInputElement;
    setMdText(value);
  };

  const handleConvertClick = () => {
    const raw = markdownToDraft(mdText);
    onStateChange(RichEditorState.createWithRaw(raw));
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleConvertClick}>
        Convert
      </Button>
      <TextField style={{ width: '100%' }} multiline onChange={handleChangeMd} />
    </div>
  );
};

export default Markdown;
