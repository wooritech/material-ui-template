import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ContentBlock } from 'draft-js';
import { RichEditorState } from '../modules';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    padding: '8px',
  },
  toolbar: {
    height: '50px',
  },
}));

/** RealGridExtensionProps */
interface RealGridExtensionProps {
  editorState: RichEditorState;
  onStateChange: (eidtorState: RichEditorState) => void;
  // 에디터에서 그리드 블럭이 선택되면 선택된 블럭 객체가 넘어온다.
  block: ContentBlock | undefined;
}

/** RealGridExtension */
const RealGridExtension: React.FC<RealGridExtensionProps> = (props) => {
  const classes = useStyles();
  const { editorState, onStateChange, block } = props;

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>Tab</div>
      <TextField
        label="Fields"
        multiline
        rows={15}
        fullWidth
        variant="outlined"
        value={block?.getKey()}
        // onChange={handleChangeMd}
        // helperText="마크다운 문서입력 후 변환 버튼을 누르면 변환 됩니다."
        // autoFocus
      />
    </div>
  );
};

export default RealGridExtension;
