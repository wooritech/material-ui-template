/* eslint-disable no-unused-expressions */
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
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: '0',
  },
  pre: {
    overflow: 'auto',
    margin: '0',
    color: '#eee',
    fontSize: '1.3em',
    backgroundColor: '#0d0d0d',
  },
}));

/** PreviewExtensionProps */
interface PreviewExtensionProps {
  viewType: string | undefined;
  editorState: RichEditorState;
}

/** PreviewExtension */
const PreviewExtension: React.FC<PreviewExtensionProps> = (props) => {
  const { viewType, editorState } = props;
  const classes = useStyles();
  const contents = ConvertUtils.convertToHTML(editorState);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const iframeDoc = iframeRef?.current?.contentDocument;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(contents);
      iframeDoc.close();
    }
  });

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
    <div className={classes.root}>
      {/* {viewType === 'browser' ? <div dangerouslySetInnerHTML={{ __html: contents }} /> : null} */}
      {viewType === 'browser' ? (
        <iframe className={classes.iframe} title="richeditor_html_preview" ref={iframeRef}>
          <p>iframe이 지원되지 않는 브라우저 입니다.</p>
        </iframe>
      ) : null}
      {viewType === 'html' ? <pre className={classes.pre}>{pretty(contents, option)}</pre> : null}
    </div>
  );
};

export default PreviewExtension;
