import React from 'react';
import { ContentBlock } from 'draft-js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RichEditorState } from '../modules';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    padding: '8px',
  },
  toolbar: {
    height: '50px',
  },
}));

/** RealGridExtensionProps */
interface RealGridExtensionProps {
  editorState: RichEditorState;
  onStateChange: (eidtorState: RichEditorState) => void;
  // 에디터에서 그리드 블럭이 선택되면 선택된 블럭 객체가 넘어온다.
  block: ContentBlock | undefined;
}

/** RealGridExtension */
const RealGridExtension: React.FC<RealGridExtensionProps> = (props) => {
  const classes = useStyles();
  const { editorState, onStateChange, block } = props;
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, v: any) => {
    setValue(v);
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="필드" />
          <Tab label="컬럼" />
          <Tab label="데이터" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default RealGridExtension;
