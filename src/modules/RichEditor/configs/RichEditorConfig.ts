import { Record } from 'immutable';
import { RichEditorToolbarConfig } from './types';
import { defaultToolbarConfig } from './toolbars';

interface Config {
  toolbarConfig: RichEditorToolbarConfig;
}

const defaultConfig: Partial<Config> = {
  toolbarConfig: defaultToolbarConfig,
};

export default class RichEditorConfig extends Record(defaultConfig) implements Config {
  constructor(toolbarConfig?: RichEditorToolbarConfig) {
    if (toolbarConfig) super({ toolbarConfig });
    else super({ toolbarConfig: defaultToolbarConfig });
  }

  get toolbarConfig(): RichEditorToolbarConfig {
    return this.get('toolbarConfig');
  }
}
