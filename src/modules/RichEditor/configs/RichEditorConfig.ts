/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Immutable from 'immutable';
import { RichEditorToolbarConfig } from './types';
import { defaultToolbarConfig } from './toolbars';

type RichEditorToolbarExtension = string | 'raw' | 'lang' | 'preview' | undefined;

interface Config {
  toolbarConfig: RichEditorToolbarConfig;
  extension: RichEditorToolbarExtension;
  image: {
    /** 로컬 이미지를 처리하는 방식 */
    fileProcess: 'base64' | 'upload-url' | string;
  };
}

const defaultConfig: Partial<Config> = {
  toolbarConfig: defaultToolbarConfig,
  extension: undefined,
  image: {
    fileProcess: 'base64',
  },
};

export default class RichEditorConfig extends Immutable.Record(defaultConfig) implements Config {
  constructor(toolbarConfig?: RichEditorToolbarConfig) {
    if (toolbarConfig) super({ toolbarConfig });
    else super({ toolbarConfig: defaultToolbarConfig });
  }

  get toolbarConfig(): RichEditorToolbarConfig {
    return this.get('toolbarConfig');
  }

  get extension(): RichEditorToolbarExtension {
    return this.get('extension');
  }

  get image(): any {
    return this.get('image');
  }

  get imageFileProcess(): string {
    return this.getIn(['image', 'fileProcess']);
  }

  setExtension(newExtension: RichEditorToolbarExtension): RichEditorConfig {
    return this.set('extension', newExtension) as RichEditorConfig;
  }
}
