/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RichEditor } from '../components';
import { RichEditorState } from '../modules';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const [editorState, setEditorState] = React.useState(RichEditorState.createEmpty());
  const handleMleState = (state: RichEditorState) => {
    setEditorState(state);
  };

  return <RichEditor editorState={editorState} onChange={handleMleState} />;
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  editor: {
    overflow: 'auto',
    fontSize: '16px',
    color: '#24292e',
    // backgroundColor: '#eee',
    borderRadius: '3px',
    padding: '5px',
    /**
     * TODO: 스타일 수정 필요
     *  화면 크기에 따라 툴바의 높이가 변하면 전체 감싸고 있는 panel의 높이를 벗어남.
     */
    height: '100%',
    width: '100%',
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="영어" {...a11yProps(0)} />
        <Tab label="중국어" {...a11yProps(1)} />
        <Tab label="일본어" {...a11yProps(2)} />
        <Tab label="+ 언어 추가" {...a11yProps(3)} />
      </Tabs>
      <div className={classes.editor}>
        <TabPanel value={value} index={0} />
      </div>
    </div>
  );
}
