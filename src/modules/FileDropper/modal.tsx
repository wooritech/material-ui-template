/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DropzoneProps } from 'react-dropzone';
import Dropper from './dropper';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface DropperModalProps extends DropzoneProps {
  open: boolean;
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown', dropedFiles: string[]) => void;
}

const DropperModal: React.FC<DropperModalProps> = (props) => {
  const classes = useStyles();
  const { open, onClose } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [dropedFiles, setFiles] = React.useState<string[]>([]);

  // File로 base64 만들기
  const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> | undefined => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = function(event: ProgressEvent<FileReader>) {
        resolve(event.target ? event.target.result : null);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // eslint-disable-next-line array-callback-return
      acceptedFiles.map((file: File): void => {
        const p = fileToBase64(file);
        p!.then((v) => {
          if (typeof v === 'string') {
            dropedFiles.push(v);
            setFiles(dropedFiles);
          }
        });
      });
    }
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (onClose) onClose(event, reason, dropedFiles);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">파일 업로드 모듈 (beta)</h2>
          <Dropper onDrop={handleDrop} />
        </div>
      </Modal>
    </div>
  );
};

export default DropperModal;
