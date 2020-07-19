/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ContentBlock } from 'draft-js';
import MarkdownExtension from './MarkdownExtension';
import RealGridExtension from './RealGridExtension';
import RawViewExtension from './RawViewExtension';
import PreviewExtension from './PreviewExtension';
import { RichEditorState } from '../modules';
import DefaultLanguageViewExtension from './DefaultLanguageViewExtension';

interface ExtensionPanelProps {
  extensionValue: any;
  extensionType: string | undefined;
  richState: RichEditorState;
  onStateChange: (state: RichEditorState) => void;
}

const ExtensionPanel: React.FC<ExtensionPanelProps> = (props) => {
  const { extensionType, richState, onStateChange, extensionValue } = props;

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
          block={extensionValue?.block as ContentBlock}
        />
      ) : null}
      {extensionType === 'lang' ? (
        <DefaultLanguageViewExtension extensionValue={extensionValue} />
      ) : null}
    </>
  );
};

export default ExtensionPanel;
