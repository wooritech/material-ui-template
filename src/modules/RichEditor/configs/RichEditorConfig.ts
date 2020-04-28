/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Immutable from 'immutable';
import { RichEditorToolbarConfig } from './types';
import { defaultToolbarConfig } from './toolbars';

type RichEditorToolbarExtension = string | 'raw' | 'preview' | undefined;

interface Config {
  toolbarConfig: RichEditorToolbarConfig;
  // 메인 편집기에서 편집한 문서 언어
  defaultLanguage: string;
  currentLanguage: string;
  extension: RichEditorToolbarExtension;
  image: {
    /** 로컬 이미지를 처리하는 방식 */
    fileProcess: 'base64' | 'upload-url' | string;
  };
}

const defaultConfig: Partial<Config> = {
  toolbarConfig: defaultToolbarConfig,
  defaultLanguage: 'kr',
  currentLanguage: 'kr',
  extension: undefined,
  image: {
    fileProcess: 'base64',
  },
};

// richeditor의 config + state 관리
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

  get isCustomExtension(): boolean {
    return ['lang', 'raw', 'browser', 'html'].includes(this.get('extension'));
  }

  get defaultLanguage(): string {
    return this.get('defaultLanguage');
  }

  get currentLanguage(): string {
    return this.get('currentLanguage');
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

  setImageFileProcess(fileProcess: 'base64' | 'upload-url' | string): RichEditorConfig {
    return this.setIn(['image', 'fileProcess'], fileProcess) as RichEditorConfig;
  }

  setCurrentLanguage(lang: string): RichEditorConfig {
    return this.set('currentLanguage', lang) as RichEditorConfig;
  }
}
