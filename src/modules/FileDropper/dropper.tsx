/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import { DropFile } from './types';
import useStyles from './styles';

const Dropper: React.FC<DropzoneProps> = (props) => {
  const { onDrop, onDropAccepted, onDropRejected } = props;
  const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop,
    onDropAccepted,
    onDropRejected,
  });

  const acceptedFilesItems = acceptedFiles.map((file: DropFile) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const rejectedFilesItems = rejectedFiles.map((file: DropFile) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useStyles();

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>이미지 파일을 아래에 끌어서 놓거나 클릭해서 파일을 추가하세요.</p>
        <em>*.jpeg와 *.png 파일만 가능</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFilesItems}</ul>
        <h4>Rejected files</h4>
        <ul>{rejectedFilesItems}</ul>
      </aside>
    </section>
  );
};

export default Dropper;
