import { Record } from 'immutable';
import { RichEditorToolbarConfig } from './types';
import { defaultToolbarConfig } from './toolbars';

type RichEditorToolbarExtension = string | 'raw' | 'lang' | 'preview' | undefined;

interface Config {
  toolbarConfig: RichEditorToolbarConfig;
  extension: RichEditorToolbarExtension;
}

const defaultConfig: Partial<Config> = {
  toolbarConfig: defaultToolbarConfig,
  extension: undefined,
};

export default class RichEditorConfig extends Record(defaultConfig) implements Config {
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

  setExtension(newExtension: RichEditorToolbarExtension): RichEditorConfig {
    return this.set('extension', newExtension) as RichEditorConfig;
  }
}
