import React from 'react';
import Markdown from './Markdown';
import RawView from './RawView';
import Preview from './Preview';
import { RichEditorState } from '../modules';

interface ExtensionPanelProps {
  extensionType: string | undefined;
  richState: RichEditorState;
  onStateChange: (state: RichEditorState) => void;
}

const ExtensionPanel: React.FC<ExtensionPanelProps> = (props) => {
  const { extensionType, richState, onStateChange } = props;

  return (
    <>
      {extensionType === 'markdown' ? (
        <Markdown editorState={richState} onStateChange={onStateChange} />
      ) : null}
      {extensionType === 'raw' ? <RawView editorState={richState} /> : null}
      {extensionType === 'browser' ? <Preview viewType="browser" editorState={richState} /> : null}
      {extensionType === 'html' ? <Preview viewType="html" editorState={richState} /> : null}
    </>
  );
};

export default ExtensionPanel;
