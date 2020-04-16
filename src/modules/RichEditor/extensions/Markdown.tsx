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
  toolbar: {
    height: '50px',
  },
}));

/** RichEditorMarkdownProps */
interface RichEditorMarkdownProps {
  editorState: RichEditorState;
  onStateChange: (eidtorState: RichEditorState) => void;
}

/** Markdown */
const Markdown: React.FC<RichEditorMarkdownProps> = (props) => {
  const { onStateChange } = props;
  const classes = useStyles();
  const [mdText, setMdText] = React.useState('');

  const handleChangeMd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMdText(value);
  };

  const handleConvertClick = () => {
    const raw = markdownToDraft(mdText);
    onStateChange(RichEditorState.createWithRaw(raw));
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Button variant="outlined" color="primary" onClick={handleConvertClick}>
          문서로 변환
        </Button>
      </div>
      <TextField
        label="마크다운"
        // style={{ width: '100%', height: '100%' }}
        multiline
        rows={15}
        fullWidth
        variant="outlined"
        onChange={handleChangeMd}
        helperText="마크다운 문서입력 후 변환 버튼을 누르면 변환 됩니다."
        autoFocus
      />
    </div>
  );
};

export default Markdown;
