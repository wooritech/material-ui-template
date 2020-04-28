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
import { BlockUtils } from '../../utils';

interface RichEditorProps {
  editorState: EditorState;
  blockStyleFn?: (block: ContentBlock) => string;
  blockRendererFn?: (block: ContentBlock) => any;
  onChange: (editorState: EditorState) => void;
  onChangeBlock?: (block: ContentBlock) => void;
  readOnly?: boolean | undefined;
  // ref?: string | ((instance: Editor | null) => void) | React.RefObject<Editor> | null | undefined;
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
  useEditorStyles();
  const { onChange, editorState, blockStyleFn, blockRendererFn, readOnly, onChangeBlock } = props;
  const [currentBlock, setCurrentBlock] = React.useState<ContentBlock>();

  const handleChange = (state: EditorState) => {
    /** 선택된 anchor 블럭의 키가 달라지면 onChangeBlock 호출 */
    const block = BlockUtils.getCurrentAnchorBlock(state);
    if (currentBlock?.getKey() !== block.getKey()) {
      console.log('onChangeBlock:', currentBlock?.getKey(), ' ==> ', block.getKey());
      if (onChangeBlock) onChangeBlock(block);
      setCurrentBlock(block);
    }
    onChange(state);
  };

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
      onChange={handleChange}
      placeholder="여기에 내용을 입력하세요."
      readOnly={readOnly}
      // spellCheck
    />
  );
};

export default RichEditor;
