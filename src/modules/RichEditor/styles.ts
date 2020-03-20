import { makeStyles, Theme } from '@material-ui/core/styles';

export const useToolbarStyle = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: '#ddd',
    margin: theme.spacing(1),
  },
}));

export const useEditorStyles = makeStyles((theme: Theme) => ({
  '@global': {
    '.RichEditor-align-left .public-DraftStyleDefault-ltr': {
      textAlign: 'left',
    },
    '.RichEditor-align-center .public-DraftStyleDefault-ltr': {
      textAlign: 'center',
    },
    '.RichEditor-align-right .public-DraftStyleDefault-ltr': {
      textAlign: 'right',
    },
    '.RichEditor-align-justify .public-DraftStyleDefault-ltr': {
      textAlign: 'justify',
    },
    '.DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content': {
      height: '100%',
      textAlign: 'initial',
    },
    '.public-DraftEditor-content[contenteditable=true]': {
      webkitUserModify: 'read-write-plaintext-only',
    },
    '.DraftEditor-root': {
      position: 'relative',
    },
    '.DraftEditor-editorContainer': {
      borderLeft: '.1px solid transparent',
      position: 'relative',
      zIndex: 1,
    },
    '.public-DraftEditor-block': {
      position: 'relative',
    },
    '.DraftEditor-alignLeft .public-DraftStyleDefault-block': {
      textAlign: 'left',
    },
    '.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root': {
      left: 0,
      textAlign: 'left',
    },
    '.DraftEditor-alignCenter .public-DraftStyleDefault-block': {
      textAlign: 'center',
    },
    '.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root': {
      margin: '0 auto',
      textAlign: 'center',
      width: '100%',
    },
    '.DraftEditor-alignRight .public-DraftStyleDefault-block': {
      textAlign: 'right',
    },
    '.DraftEditor-alignRight .public-DraftEditorPlaceholder-root': {
      right: 0,
      textAlign: 'right',
    },
    '.public-DraftEditorPlaceholder-root': {
      color: '#9197a3',
      position: 'absolute',
      zIndex: 1,
    },
    '.public-DraftEditorPlaceholder-hasFocus': {
      color: '#bdc1c9',
    },
    '.DraftEditorPlaceholder-hidden': {
      display: 'none',
    },
    '.public-DraftStyleDefault-block': {
      position: 'relative',
      whiteSpace: 'pre-wrap',
    },
    '.public-DraftStyleDefault-pre': {
      backgroundColor: '#272c34',
      color: '#fff',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: theme.spacing(2),
    },
    '.public-DraftStyleDefault-ltr': {
      direction: 'ltr',
      textAlign: 'left',
    },
    '.public-DraftStyleDefault-rtl': {
      direction: 'rtl',
      textAlign: 'right',
    },
    '.public-DraftStyleDefault-listLTR': {
      direction: 'ltr',
    },
    '.public-DraftStyleDefault-listRTL': {
      direction: 'rtl',
    },
    '.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul': {
      margin: '16px 0',
      padding: 0,
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR': {
      marginLeft: '1.5em',
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL': {
      marginRight: '1.5em',
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR': {
      marginLeft: '3em',
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL': {
      marginRight: '3em',
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR': {
      marginLeft: '4.5em',
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL': {
      marginRight: '4.5em',
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR': {
      marginLeft: '6em',
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL': {
      marginRight: '6em',
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR': {
      marginLeft: '7.5em',
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL': {
      marginRight: '7.5em',
    },
    '.public-DraftStyleDefault-unorderedListItem': {
      listStyleType: 'square',
      position: 'relative',
    },
    '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0': {
      listStyleType: 'disc',
    },
    '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1': {
      listStyleType: 'circle',
    },
    '.public-DraftStyleDefault-orderedListItem': {
      listStyleType: 'none',
      position: 'relative',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before': {
      left: '-36px',
      position: 'absolute',
      textAlign: 'right',
      width: '30px',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before': {
      position: 'absolute',
      right: '-36px',
      textAlign: 'left',
      width: '30px',
    },
    '.public-DraftStyleDefault-orderedListItem:before': {
      content: 'counter(ol0) ". "',
      counterIncrement: 'ol0',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before': {
      content: 'counter(ol1,lower-alpha) ". "',
      counterIncrement: 'ol1',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before': {
      content: 'counter(ol2,lower-roman) ". "',
      counterIncrement: 'ol2',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before': {
      content: 'counter(ol3) ". "',
      counterIncrement: 'ol3',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before': {
      content: 'counter(ol4,lower-alpha) ". "',
      counterIncrement: 'ol4',
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset': {
      counterReset: 'ol0',
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset': {
      counterReset: 'ol1',
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset': {
      counterReset: 'ol2',
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset': {
      counterReset: 'ol3',
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset': {
      counterReset: 'ol4',
    },
  },
}));