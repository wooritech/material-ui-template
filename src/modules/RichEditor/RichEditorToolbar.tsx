import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { RichEditorState } from './modules';
import { RichEditorConfig } from './configs';
import { ControlComponents } from './controls';
import { EventRichCommand } from './types';

const useToolbarStyle = makeStyles((theme: Theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  divider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5),
  },
  toolbar: {
    margin: theme.spacing(0, 1),
  },
}));

interface RichEditorToolbarProps {
  richConfig: RichEditorConfig;
  editorState: RichEditorState;
  onRichCommand: EventRichCommand;
  readOnly: boolean;
  onStateChange: (eidtorState: RichEditorState) => void;
}

/** 툴바에 버튼을 생성하는 컴포넌트 */
const RichEditorToolbar: React.FC<RichEditorToolbarProps> = (props) => {
  const classes = useToolbarStyle();
  const { richConfig, editorState, onStateChange, onRichCommand, readOnly } = props;
  const controlConfig = richConfig.toolbarConfig;

  return (
    <div className={classes.toolbar}>
      <Grid container spacing={0}>
        <Grid item>
          <Paper elevation={0} className={classes.paper}>
            {controlConfig.map((control, index) => {
              if (control.type === 'DIVIDER')
                return (
                  <Divider
                    key={index.toString()}
                    orientation="vertical"
                    className={classes.divider}
                    light
                  />
                );

              if (!control.buttons)
                throw new Error(`${control.name}.buttons 속성에 값이 없거나 잘못되었습니다.`);

              return (
                <ControlComponents
                  key={index.toString()}
                  name={control.name}
                  richConfig={richConfig}
                  editorState={editorState}
                  onChange={onStateChange}
                  buttonItems={control.buttons}
                  onRichCommand={onRichCommand}
                  readOnly={readOnly}
                />
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RichEditorToolbar;
