/* eslint-disable react/no-danger */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RichEditorState } from '../modules';
import { Converter } from '../utils';
import { ToolButtons } from '../components';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
  viewer: {
    height: 'calc(100vh - 185px - 48px)',
    overflow: 'auto',
    padding: '16px',
    border: '1px solid',
  },
}));

const buttons = [
  { label: 'Browser', value: 'browser', icon: 'language_outlined' },
  { label: 'HTML', value: 'html' },
];

/** RichEditorPreviewProps */
interface RichEditorPreviewProps {
  editorState: RichEditorState;
}

/** PreviewExtension */
const Preview: React.FC<RichEditorPreviewProps> = (props) => {
  const { editorState } = props;
  const classes = useStyles();
  const contents = Converter.convertToHTML(editorState);

  const [value, setValue] = React.useState('browser');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSelected = (selected: string) => {
    return value === selected;
  };

  return (
    <div className={classes.root}>
      <ToolButtons
        buttonItems={buttons}
        checkSelected={handleSelected}
        exclusive
        onChange={handleChange}
      />

      <div className={classes.viewer}>
        <div hidden={value !== 'browser'} dangerouslySetInnerHTML={{ __html: contents }} />
        <div hidden={value !== 'html'}>
          <pre>{contents}</pre>
        </div>
      </div>

      {/* <div dangerouslySetInnerHTML={{ __html: contents }} />
      <div>
        <pre>{contents}</pre>
      </div> */}
    </div>
  );
};

export default Preview;
