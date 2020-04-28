import React from 'react';
import { ContentBlock } from 'draft-js';
import MarkdownExtension from './MarkdownExtension';
import RealGridExtension from './RealGridExtension';
import RawViewExtension from './RawViewExtension';
import PreviewExtension from './PreviewExtension';
import { RichEditorState } from '../modules';

interface ExtensionPanelProps {
  extensionBlock: ContentBlock | undefined;
  extensionType: string | undefined;
  richState: RichEditorState;
  onStateChange: (state: RichEditorState) => void;
}

const ExtensionPanel: React.FC<ExtensionPanelProps> = (props) => {
  const { extensionType, richState, onStateChange, extensionBlock } = props;

  return (
    <>
      {extensionType === 'markdown' ? (
        <MarkdownExtension editorState={richState} onStateChange={onStateChange} />
      ) : null}
      {extensionType === 'raw' ? <RawViewExtension editorState={richState} /> : null}
      {extensionType === 'browser' ? (
        <PreviewExtension viewType="browser" editorState={richState} />
      ) : null}
      {extensionType === 'html' ? (
        <PreviewExtension viewType="html" editorState={richState} />
      ) : null}
      {extensionType === 'realgrid' ? (
        <RealGridExtension
          editorState={richState}
          onStateChange={onStateChange}
          block={extensionBlock}
        />
      ) : null}
    </>
  );
};

export default ExtensionPanel;
