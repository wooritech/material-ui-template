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
  convertFromRaw,
} from 'draft-js';

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

export type KeyName = 'ENTER';
export type KeyCode = number;
export const KEYCODES: Record<KeyName, KeyCode> = {
  ENTER: 13,
};

const SPLIT_HEADER_BLOCK = 'split-header-block';

type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

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

const getBlockStyle = (block: ContentBlock) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return '';
  }
};

// 'code' 스타일 매핑
const styleMap: DraftStyleMap = {
  CODE: {
    backgroundColor: '#272c34',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const RichEditor: React.FC = () => {
  // const [state, setState] = React.useState(EditorState.createEmpty());
  // 이렇게 하면 Warning: Prop `data-offset-key` did not match. 발생하면서
  // Uncaught TypeError: Cannot read property 'getIn' of... 오류까지 발생.

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
  const [state, setState] = React.useState(EditorState.createWithContent(emptyContentState));

  const onChange = (editorState: EditorState) => {
    setState(editorState);
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

  const toggleBlockType: (blockType: string) => void = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(state, blockType));
  };

  const toggleInlineStyle: (inlineStyle: string) => void = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(state, inlineStyle));
  };

  // 텍스트를 입력하기 전에 사용자가 블록 유형을 변경하면
  // placeholder 스타일을 지정하거나 숨긴다.
  let className = 'RichEditor-editor';
  const contentState = state.getCurrentContent();
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== 'unstyled'
    ) {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={state} onToggle={toggleBlockType} />
      <InlineStyleControls editorState={state} onToggle={toggleInlineStyle} />
      <div className={className}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorKey="test-key"
          editorState={state}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder="내용을 입력하세요."
          spellCheck
        />
      </div>
    </div>
  );
};

export default RichEditor;
