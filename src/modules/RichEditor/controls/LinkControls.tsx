import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SelectionState } from 'draft-js';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';
import { ContentUtils, BlockUtils } from '../utils';

/** 미리 정의된 컨트롤이 없는 경우 기본 컨트롤로 사용 */
const LinkControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, buttonItems, readOnly, onRichCommand } = props;
  const [open, setOpen] = React.useState(false);
  const [linkText, setLinkText] = React.useState('');
  const [selection, setSelection] = React.useState<SelectionState>();

  const handleClose = () => {
    setOpen(false);
    const state = ContentUtils.selectCurrent(editorState);
    onRichCommand('change-state', state);
  };

  const handleChange = (value: string) => {
    if (readOnly) return;

    if (value === 'link') {
      // selection의 시작지점에 링크가 있어야 함. 없으면 새 링크 만들기.
      setSelection(editorState.getSelection());

      const url = ContentUtils.getLinkUrl(editorState);
      setLinkText(url);

      if (url || !selection?.isCollapsed()) {
        setOpen(true);
      }
    }
  };

  const handleChangeLinkText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLinkText(value);
  };

  const handleRemoveLink = () => {
    setOpen(false);
    const newState = ContentUtils.removeLink(editorState);
    onRichCommand('change-state', newState);
  };

  const handleSetLink = () => {
    const newState = ContentUtils.confirmLink(editorState, linkText, linkText);
    onRichCommand('change-state', newState);
    setOpen(false);
  };

  return (
    <>
      <ToolButtons
        buttonItems={buttonItems as ButtonItemType[]}
        exclusive
        onChange={handleChange}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
        // style={{ width: '200px' }}
      >
        {/* <DialogTitle id="form-dialog-title">링크</DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>
            선택 영역에 링크를 지정할 수 있습니다. <br />
            http 또는 https를 포함한 URL 링크, mailto:onlydel@wooritech.com 과 같은 이메일 링크를
            입력할 수 있습니다.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="linkText"
            label="링크"
            type="email | url"
            value={linkText}
            onChange={handleChangeLinkText}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetLink} color="primary">
            확인
          </Button>
          <Button onClick={handleRemoveLink} color="primary">
            지우기
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LinkControls;
