/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import pretty from 'pretty';
import { RichEditorState } from '../modules';
import { ConvertUtils } from '../utils';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
  pre: {
    fontSize: '1.3em',
  },
}));

/** RichEditorPreviewProps */
interface RichEditorPreviewProps {
  view: string | undefined;
  editorState: RichEditorState;
}

/** PreviewExtension */
const Preview: React.FC<RichEditorPreviewProps> = (props) => {
  const { view, editorState } = props;
  const classes = useStyles();
  const contents = ConvertUtils.convertToHTML(editorState);

  return (
    <div>
      {view === 'browser' ? <div dangerouslySetInnerHTML={{ __html: contents }} /> : null}
      {view === 'html' ? (
        <pre className={classes.pre}>{pretty(contents, { ocd: true })}</pre>
      ) : null}
    </div>
  );
};

export default Preview;
