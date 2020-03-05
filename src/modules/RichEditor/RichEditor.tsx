import React from 'react';
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
// import PluginEditor from 'draft-js-plugins-editor';
// import createImagePlugin from 'draft-js-image-plugin';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';
// import createFocusPlugin from 'draft-js-focus-plugin';
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
// import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { useEditorStyles } from './styles';

export type KeyName = 'ENTER';
export type KeyCode = number;
export const KEYCODES: Record<KeyName, KeyCode> = {
  ENTER: 13,
};
type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
const SPLIT_HEADER_BLOCK = 'split-header-block';

interface RichEditorProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
  useEditorStyles();
  const { onChange, editorState } = props;

  // const richState = createEmptyState(decorators);
  // const [draftState, setEditorState] = React.useState(editorState || createEmptyState(decorators));
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

  const handleKeyCommand = (command: string, state: EditorState) => {
    if (command === SPLIT_HEADER_BLOCK) {
      onChange(splitHeaderToNewBlock());
      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <Editor
      blockStyleFn={getBlockStyle}
      customStyleMap={styleMap}
      editorKey="richeditor"
      keyBindingFn={keyBindingFn}
      handleKeyCommand={handleKeyCommand}
      editorState={editorState}
      onChange={onChange}
      placeholder="여기에 내용을 입력하세요."
      spellCheck
    />
  );
};

export default RichEditor;
