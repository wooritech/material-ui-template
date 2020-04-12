import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { RichEditorDocument } from './modules';
import { EventRichCommand } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  title: {
    paddingTop: theme.spacing(1),
  },
}));

interface RichEditorHeaderProps {
  richDoc: RichEditorDocument;
  onRichCommand?: EventRichCommand;
}

const RichEditorHeader: React.FC<RichEditorHeaderProps> = (props) => {
  const classes = useStyles();
  const { richDoc, onRichCommand } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (onRichCommand) onRichCommand('change-title', richDoc.setTitle(event.target.value));
  };

  const handleActionButtonClick = (event: React.MouseEvent, command: string) => {
    if (onRichCommand) onRichCommand(command);
  };

  return (
    <Grid container spacing={0} className={classes.header}>
      <Grid item xs className={classes.title}>
        <InputBase
          type="text"
          placeholder="문서의 제목을 입력하세요."
          fullWidth
          value={richDoc.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          {/* <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={(e) => handleActionButtonClick(e, 'preview')}
            >
              미리보기
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={(e) => handleActionButtonClick(e, 'load')}
            >
              열기
            </Button>
          </Grid> */}
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={(e) => handleActionButtonClick(e, 'save')}
            >
              저장
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RichEditorHeader;
