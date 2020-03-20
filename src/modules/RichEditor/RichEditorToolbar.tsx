import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { getToolbarConfigs, defaultToolbarConfig } from './configs';
import { ControlComponents } from './controls';
import { RichEditorToolbarConfig } from './configs/types';
import { EventRichCommand, ToolbarState } from './types';

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
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));

interface RichEditorToolbarProps {
  editorState: EditorState;
  onRichCommand: EventRichCommand;
  onChange: (eidtorState: EditorState) => void;
  config?: RichEditorToolbarConfig;
  /** 임시: editor config 를 만들자. */
  toolbarState: ToolbarState;
}

const RichEditorToolbar: React.FC<RichEditorToolbarProps> = (props) => {
  const classes = useToolbarStyle();
  const { editorState, onChange, config, onRichCommand, toolbarState } = props;
  const controlConfig =
    config ||
    defaultToolbarConfig ||
    getToolbarConfigs([
      'UndoRedo',
      'Divider',
      'HeadingStyle',
      'Divider',
      'BlockStyle',
      'Divider',
      'InlineStyle',
      'Divider',
      'Image',
      'Divider',
      'Extension',
    ]);

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
                  editorState={editorState}
                  onChange={onChange}
                  buttonItems={control.buttons}
                  onRichCommand={onRichCommand}
                  toolbarState={toolbarState}
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
