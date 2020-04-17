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

interface RichEditorProps {
  editorState: EditorState;
  blockStyleFn?: (block: ContentBlock) => string;
  blockRendererFn?: (block: ContentBlock) => any;
  onChange: (editorState: EditorState) => void;
  readOnly?: boolean | undefined;
  // ref?: string | ((instance: Editor | null) => void) | React.RefObject<Editor> | null | undefined;
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
  useEditorStyles();
  const { onChange, editorState, blockStyleFn, blockRendererFn, readOnly } = props;

  return (
    <Editor
      // ref={ref}
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
