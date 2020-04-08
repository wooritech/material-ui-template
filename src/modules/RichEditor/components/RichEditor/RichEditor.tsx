/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ContentBlock,
  Editor,
  EditorState,
  // Modifier,
  // RichUtils,
  // SelectionState,
  // getDefaultKeyBinding,
} from 'draft-js';
import { useEditorStyles, customStyleMap } from './styles';

// export type KeyName = 'ENTER';
// export type KeyCode = number;
// export const KEYCODES: Record<KeyName, KeyCode> = {
//   ENTER: 13,
// };
// type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
// const SPLIT_HEADER_BLOCK = 'split-header-block';

interface RichEditorProps {
  editorState: EditorState;
  blockStyleFn?: (block: ContentBlock) => string;
  blockRendererFn?: (block: ContentBlock) => any;
  onChange: (editorState: EditorState) => void;
  readOnly?: boolean | undefined;
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
  useEditorStyles();
  const { onChange, editorState, blockStyleFn, blockRendererFn, readOnly } = props;

  // const isHeaderBlock = (block: ContentBlock): boolean => {
  //   switch (block.getType()) {
  //     case 'header-one':
  //     case 'header-two':
  //     case 'header-three':
  //     case 'header-four':
  //     case 'header-five':
  //     case 'header-six': {
  //       return true;
  //     }
  //     default:
  //       return false;
  //   }
  // };

  // const splitHeaderToNewBlock = (): EditorState => {
  //   const selection = editorState.getSelection();

  //   // 커서 다음에 새 블록 추가
  //   const contentWithBlock = Modifier.splitBlock(editorState.getCurrentContent(), selection);

  //   // 새 블록 유형을 일반 'unstyled' 텍스트로 변경, table인 경우도 new block
  //   const newBlock = contentWithBlock.getBlockAfter(selection.getEndKey());
  //   const contentWithUnstyledBlock = Modifier.setBlockType(
  //     contentWithBlock,
  //     SelectionState.createEmpty(newBlock.getKey()),
  //     'unstyled',
  //   );

  //   // undo/redo 스택을 유지하려면 'insert-characters'로 state push
  //   const stateWithNewline = EditorState.push(
  //     editorState,
  //     contentWithUnstyledBlock,
  //     'insert-characters',
  //   );

  //   // 수동으로 커서를 다음 줄로 이동
  //   const nextState = EditorState.forceSelection(
  //     stateWithNewline,
  //     SelectionState.createEmpty(newBlock.getKey()),
  //   );

  //   return nextState;
  // };

  // const keyBindingFn = (e: SyntheticKeyboardEvent): string | null => {
  //   if (e.keyCode === KEYCODES.ENTER) {
  //     const contentState = editorState.getCurrentContent();
  //     const selectionState = editorState.getSelection();

  //     // 헤더 끝에서 'Enter'를 누르면 헤더를 분할하고 스타일을 지정하지 않습니다.
  //     if (selectionState.isCollapsed()) {
  //       const endKey = selectionState.getEndKey();
  //       const endOffset = selectionState.getEndOffset();
  //       const endBlock = contentState.getBlockForKey(endKey);
  //       if (isHeaderBlock(endBlock) && endOffset === endBlock.getText().length) {
  //         return SPLIT_HEADER_BLOCK;
  //       }
  //     }
  //   }

  //   return getDefaultKeyBinding(e);
  // };

  // const handleKeyCommand = (command: string, state: EditorState) => {
  //   if (command === SPLIT_HEADER_BLOCK) {
  //     onChange(splitHeaderToNewBlock());
  //     return 'handled';
  //   }

  //   const newState = RichUtils.handleKeyCommand(state, command);

  //   if (newState) {
  //     onChange(newState);
  //     return 'handled';
  //   }

  //   return 'not-handled';
  // };

  return (
    <Editor
      blockStyleFn={blockStyleFn}
      blockRendererFn={blockRendererFn}
      customStyleMap={customStyleMap}
      editorKey="richeditor"
      // keyBindingFn={keyBindingFn}
      // handleKeyCommand={handleKeyCommand}
      editorState={editorState}
      onChange={onChange}
      placeholder="여기에 내용을 입력하세요."
      readOnly={readOnly}
      // spellCheck
    />
  );
};

export default RichEditor;
