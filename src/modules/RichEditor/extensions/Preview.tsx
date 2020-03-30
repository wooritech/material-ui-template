/* eslint-disable @typescript-eslint/camelcase */
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
  const option = {
    ocd: false,
    // indent_size: '4',
    // indent_char: ' ',
    // max_preserve_newlines: '2',
    // preserve_newlines: true,
    // keep_array_indentation: true,
    // break_chained_methods: true,
    // indent_scripts: 'separate',
    // brace_style: 'expand',
    // space_before_conditional: true,
    // unescape_strings: true,
    // jslint_happy: true,
    // end_with_newline: true,
    // wrap_line_length: '0',
    // indent_inner_html: false,
    // comma_first: false,
    // e4x: false,
    // indent_empty_lines: true,
  };

  return (
    <div>
      {view === 'browser' ? <div dangerouslySetInnerHTML={{ __html: contents }} /> : null}
      {view === 'html' ? <pre className={classes.pre}>{pretty(contents, option)}</pre> : null}
    </div>
  );
};

export default Preview;
