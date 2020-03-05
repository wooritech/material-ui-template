import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {
  RichEditor,
  RichEditorToolbar,
  RichEditorState,
  createEmptyState,
  RichEditorRawViewer,
} from '~/modules/RichEditor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    margin: theme.spacing(0),
    overflow: 'hidden',
    height: '100%',
  },
  toolbar: {
    width: 'fit-content',
    backgroundColor: '#fff',
    margin: theme.spacing(1),
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  editor: {
    overflow: 'auto',
    fontSize: '16px',
    color: '#24292e',
    backgroundColor: '#eee',
    borderRadius: '3px',
    padding: '5px',
    /**
     * TODO: 스타일 수정 필요
     *  화면 크기에 따라 툴바의 높이가 변하면 전체 감싸고 있는 panel의 높이를 벗어남.
     */
    height: 'calc(100vh - 124px)',
  },
  extentions: {
    overflow: 'auto',
    fontSize: '16px',
    height: 'calc(100vh - 124px)',
    borderRadius: '3px',
    padding: theme.spacing(1),
  },
  extRaw: {
    color: '#eee',
    backgroundColor: '#0d0d0d',
  },
  extLang: {
    color: '#0d0d0d',
    backgroundColor: '#e3f2fd',
  },
  divider: {
    backgroundColor: '#ddd',
    margin: theme.spacing(1),
  },
}));

const MultiLanguageEditor: React.FC<{ editorState: RichEditorState }> = (props) => {
  const { editorState } = props;
  const [mleEditorState, setMleEditorState] = React.useState(createEmptyState());
  const onChange = (richState: RichEditorState) => {
    setMleEditorState(richState);
  };
  return <RichEditor editorState={mleEditorState} onChange={onChange} />;
};

/**
 * EditorPanel 컴포넌트
 */
const EditorPanel: React.FC = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = React.useState(createEmptyState());
  const [extMode, setExtMode] = React.useState('NONE'); // NONE, RAW, PREVEW, LANG

  const onChange = (state: RichEditorState) => {
    setEditorState(state);
  };

  const [mleState, setMleState] = React.useState(createEmptyState());
  const handleMleState = (richState: RichEditorState) => {
    setMleState(richState);
  };

  const toggleRawViewer = () => {
    if (extMode !== 'RAW') setExtMode('RAW');
    else setExtMode('NONE');
  };

  const toggleLangViewer = () => {
    if (extMode !== 'LANG') setExtMode('LANG');
    else setExtMode('NONE');
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Grid container spacing={0}>
          <Grid item>
            <RichEditorToolbar editorState={editorState} onChange={onChange} />
          </Grid>
          <Divider orientation="vertical" flexItem className={classes.divider} />
          <Grid item>
            <Button variant="text" tabIndex={0} onClick={toggleRawViewer}>
              Row
            </Button>
            <Button variant="text" tabIndex={0} onClick={toggleLangViewer}>
              다른언어
            </Button>
            <Button variant="text" tabIndex={0} onClick={toggleLangViewer}>
              미리보기
            </Button>
            <Button variant="text" tabIndex={0} onClick={toggleLangViewer}>
              버전정보
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" light />
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={extMode === 'NONE' ? 12 : 6}>
          <div className={classes.editor}>
            <RichEditor editorState={editorState} onChange={onChange} />
          </div>
        </Grid>
        {extMode === 'RAW' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extRaw}`}>
              <RichEditorRawViewer editorState={editorState} />
            </div>
          </Grid>
        ) : null}
        {extMode === 'LANG' ? (
          <Grid item xs={6}>
            <div className={`${classes.extentions} ${classes.extLang}`}>
              <RichEditor editorState={mleState} onChange={handleMleState} />
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default EditorPanel;
