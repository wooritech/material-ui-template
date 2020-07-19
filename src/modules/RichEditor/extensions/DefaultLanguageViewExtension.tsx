/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RichEditorState, RichEditorDocument } from '../modules';
import { RichEditor } from '../components';

const useStyles = makeStyles(() => ({
  root: {
    color: '#0d0d0d',
    backgroundColor: '#e3f2fd',
  },
}));

/** DefaultLanguageViewExtensionProps */
interface DefaultLanguageViewExtensionProps {
  extensionValue: { richDoc: RichEditorDocument; defaultLanguage: string };
}

/**
 * DefaultLanguageViewExtension
 */
const DefaultLanguageViewExtension: React.FC<DefaultLanguageViewExtensionProps> = (props) => {
  const classes = useStyles();
  const { extensionValue } = props;
  const { richDoc, defaultLanguage } = extensionValue;
  const [editorState, setEditorState] = React.useState<RichEditorState>(
    RichEditorState.createWithRichDocument(richDoc, defaultLanguage),
  );

  const onEditorChange = (state: RichEditorState) => {
    setEditorState(state);
  };

  return (
    <div className={classes.root}>
      <span>기본언어({defaultLanguage})</span>
      <RichEditor
        editorState={editorState}
        onChange={onEditorChange}
        // blockRendererFn={richBlockRendererFn(handleRichCommand)}
        // blockStyleFn={blockStyleFn}
        readOnly
      />
    </div>
  );
};

export default DefaultLanguageViewExtension;
