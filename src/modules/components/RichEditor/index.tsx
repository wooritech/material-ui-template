import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
import EditControl from './EditControl';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    margin: theme.spacing(0),
    overflow: 'hidden',
  },
  toolbar: {
    // position: 'fixed',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    margin: theme.spacing(1),
  },
  editor: {},
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

  const toggleBlockType: (blockType: string) => void = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(state, blockType));
  };

  const toggleInlineStyle: (inlineStyle: string) => void = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(state, inlineStyle));
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <BlockStyleControls editorState={state} onToggle={toggleBlockType} />
        <InlineStyleControls editorState={state} onToggle={toggleInlineStyle} />
      </div>
      <EditControl state={state} onChange={onChange} />
    </div>
  );
};

export default RichEditor;
