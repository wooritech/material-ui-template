/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { File } from './types';

const Dropper = (props: any) => {
  const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
  });

  const acceptedFilesItems = acceptedFiles.map((file: File) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map((file: File) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
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
