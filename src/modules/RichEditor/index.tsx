import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { EditorState, convertFromRaw } from 'draft-js';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import EditControl from './EditControl';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import ImageControl from './ImageControl';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    margin: theme.spacing(0),
    overflow: 'hidden',
    // height: '100%',
  },
  toolbar: {
    width: 'fit-content',
    backgroundColor: '#fff',
    margin: theme.spacing(2),
  },
  editor: {},
  divider: {
    backgroundColor: '#ddd',
    margin: theme.spacing(1),
  },
}));

// 에러 없이 초기 문서 생성을 위한 코드
const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      depth: 0,
      text: '',
      key: 'empty-key',
      type: 'unstyled',
      entityRanges: [],
      inlineStyleRanges: [],
    },
  ],
});

/**
 * RichEditor 컴포넌트
 */
const RichEditor: React.FC = () => {
  // const [state, setState] = React.useState(EditorState.createEmpty());
  // 이렇게 하면 Warning: Prop `data-offset-key` did not match. 발생하면서
  // Uncaught TypeError: Cannot read property 'getIn' of... 오류까지 발생.
  const classes = useStyles();
  const [state, setState] = React.useState(EditorState.createWithContent(emptyContentState));
  const onChange = (editorState: EditorState) => {
    setState(editorState);
  };

  return (
    <>
      <div className={classes.toolbar}>
        <Grid container>
          <Grid item>
            <BlockStyleControls editorState={state} onChange={onChange} />
          </Grid>
          <Divider orientation="vertical" flexItem className={classes.divider} />
          <Grid item>
            <InlineStyleControls editorState={state} onChange={onChange} />
          </Grid>
          <Divider orientation="vertical" flexItem className={classes.divider} />
          <Grid item>
            <ImageControl editorState={state} onChange={onChange} />
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" light />
      <EditControl state={state} onChange={onChange} />
    </>
  );
};

export default RichEditor;
