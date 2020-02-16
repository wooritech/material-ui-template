import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  ContentBlock,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  getDefaultKeyBinding,
  DraftStyleMap,
} from 'draft-js';
import { ComponentBaseProps } from '~/components/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    overflow: 'auto',
    fontSize: '16px',
    color: '#24292e',
    backgroundColor: '#fafbfc',
    // TODO: 스타일 수정 필요 (Mobile 벗어남.)
    height: 'calc(100vh - 145px)',
    borderRadius: '3px',
    boxShadow: 'inset 0 1px 2px rgba(27,31,35,.075)',
  },
}));

export type KeyName = 'ENTER';
export type KeyCode = number;
export const KEYCODES: Record<KeyName, KeyCode> = {
  ENTER: 13,
};

type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

const SPLIT_HEADER_BLOCK = 'split-header-block';

interface EditControlProps extends ComponentBaseProps {
  state: EditorState;
  onChange: (editorState: EditorState) => void;
}

const EditControl: React.FC<EditControlProps> = (props) => {
  const classes = useStyles();
  const { state, onChange } = props;

  // 텍스트를 입력하기 전에 사용자가 블록 유형을 변경하면
  // placeholder 스타일을 지정하거나 숨긴다.
  // let className = 'RichEditor-editor';
  // const contentState = state.getCurrentContent();
  // if (!contentState.hasText()) {
  //   if (
  //     contentState
  //       .getBlockMap()
  //       .first()
  //       .getType() !== 'unstyled'
  //   ) {
  //     className += ' RichEditor-hidePlaceholder';
  //   }
  // }

  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return '';
    }
  };

  const isHeaderBlock = (block: ContentBlock): boolean => {
    switch (block.getType()) {
      case 'header-one':
      case 'header-two':
      case 'header-three':
      case 'header-four':
      case 'header-five':
      case 'header-six': {
        return true;
      }
      default:
        return false;
    }
  };

  // 'code' 스타일 매핑
  const styleMap: DraftStyleMap = {
    pre: {
      backgroundColor: '#272c34',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    small: {
      fontSize: '8px',
    },
    medium: {
      fontSize: '12px',
    },
    large: {
      fontSize: '16px',
    },
  };

  const splitHeaderToNewBlock = (): EditorState => {
    const editorState = state;
    const selection = editorState.getSelection();

    // 커서 다음에 새 블록 추가
    const contentWithBlock = Modifier.splitBlock(editorState.getCurrentContent(), selection);

    // 새 블록 유형을 일반 'unstyled' 텍스트로 변경
    const newBlock = contentWithBlock.getBlockAfter(selection.getEndKey());
    const contentWithUnstyledBlock = Modifier.setBlockType(
      contentWithBlock,
      SelectionState.createEmpty(newBlock.getKey()),
      'unstyled',
    );

    // undo/redo 스택을 유지하려면 'insert-characters'로 state push
    const stateWithNewline = EditorState.push(
      editorState,
      contentWithUnstyledBlock,
      'insert-characters',
    );

    // 수동으로 커서를 다음 줄로 이동
    const nextState = EditorState.forceSelection(
      stateWithNewline,
      SelectionState.createEmpty(newBlock.getKey()),
    );

    return nextState;
  };

  const keyBindingFn = (e: SyntheticKeyboardEvent): string | null => {
    if (e.keyCode === KEYCODES.ENTER) {
      const editorState = state;
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      // 헤더 끝에서 'Enter'를 누르면 헤더를 분할하고 스타일을 지정하지 않습니다.
      if (selectionState.isCollapsed()) {
        const endKey = selectionState.getEndKey();
        const endOffset = selectionState.getEndOffset();
        const endBlock = contentState.getBlockForKey(endKey);
        if (isHeaderBlock(endBlock) && endOffset === endBlock.getText().length) {
          return SPLIT_HEADER_BLOCK;
        }
      }
    }

    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    if (command === SPLIT_HEADER_BLOCK) {
      onChange(splitHeaderToNewBlock());
      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const refEditor = React.createRef<Editor>();
  const handleRootClick = () => {
    const editor = refEditor.current;
    if (editor) editor.focus();
  };

  return (
    // 웹 접근성을 위해 마우스 클릭 이벤트와 함께 키보드 이벤트를 적용하도록 권고한다.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={classes.root}
      tabIndex={0}
      role="link"
      onClick={handleRootClick}
      // onKeyPress={() => {}}
    >
      <Editor
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
        editorKey="richeditor"
        editorState={state}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        // placeholder="아래에 내용을 입력하세요."
        spellCheck
        ref={refEditor}
      />
    </div>
  );
};

export default EditControl;
