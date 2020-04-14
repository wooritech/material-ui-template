import React from 'react';
import { ToolButtons, ButtonItemType } from '../components';
import { EditorControlsProps } from './types';
import { MediaUtils } from '../utils';

/**
 * https://github.com/wooritech/material-ui-template/issues/30#issuecomment-603586703
 */
const ImageControl: React.FC<EditorControlsProps> = (props) => {
  const { richConfig, editorState, onChange, buttonItems, onRichCommand } = props;

  if (!buttonItems)
    throw new Error('InlineStyleControls.buttonItmes 속성에 값이 없거나 잘못되었습니다.');

  /* eslint-disable-next-line consistent-return */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    const files: File[] = Array.from(e.target.files);

    if (!files) return undefined;

    /* eslint-disable-next-line array-callback-return */
    files.map((file: File) => {
      if (richConfig.imageFileProcess === 'base64') {
        /** 이미지를 base64로 에디터에 직접 추가하는 경우 */
        MediaUtils.insertImageFile(editorState, file).then((state) => {
          if (state && onChange) onChange(state);
        });
      }

      if (richConfig.imageFileProcess === 'upload-url') {
        /** 이미지 파일을 저장소에 업로드 하고 그 경로를 에디터에 추가하는 경우 */
        const callbackFn = (src: string, name?: string, size?: number) => {
          // console.log('uploadedImage: ', src);
          if (onChange) onChange(MediaUtils.insertImageUrl(editorState, src, name, size));
        };

        if (onRichCommand) onRichCommand('insert-local-image', { file, callbackFn });
      }
    });
  };

  return (
    <div>
      <label htmlFor="raised-button-file">
        <input
          id="raised-button-file"
          hidden
          // multiple
          value=""
          accept="image/*"
          type="file"
          onChange={handleFile}
        />
        <ToolButtons
          buttonItems={buttonItems as ButtonItemType[]}
          exclusive={false}
          buttonComponent="span"
        />
      </label>
    </div>
  );
};

export default ImageControl;
