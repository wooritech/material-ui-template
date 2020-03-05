import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import ImageControl from './ImageControl';
import { useToolbarStyle } from './styles';

interface RichEditorToolbarProps {
  editorState: EditorState;
  onChange: (eidtorState: EditorState) => void;
}

const RichEditorToolbar: React.FC<RichEditorToolbarProps> = (props) => {
  const classes = useToolbarStyle();
  const { editorState, onChange } = props;

  return (
    <Grid container>
      <Grid item>
        <BlockStyleControls editorState={editorState} onChange={onChange} />
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Grid item>
        <InlineStyleControls editorState={editorState} onChange={onChange} />
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Grid item>
        <ImageControl editorState={editorState} onChange={onChange} />
      </Grid>
    </Grid>
  );
};

export default RichEditorToolbar;
