/** Draft js */
import { convertToRaw } from 'draft-js';

/** Editor */
import { RichEditor } from './components';
import { Preview, RawView } from './extensions';
import { RichEditorDocument, RichEditorState } from './modules';

/** Toolbar controls */
import { RichEditorConfig, defaultToolbarConfig, getToolbarConfigs } from './configs';
import RichEditorToolbar from './RichEditorToolbar';

/**
 * export types or interfaces
 * - RichLanguageRaws
 * - RichDocumentRaw
 */
export * from './modules/RichEditorDocument';

/** types */
export * from './configs/types';
export * from './types';

/** EXPORT */
export {
  /** configs */
  RichEditorConfig,
  defaultToolbarConfig,
  getToolbarConfigs,
  /** editor */
  RichEditor,
  RichEditorToolbar,
  /** modules */
  RichEditorState,
  RichEditorDocument,
  /** extension */
  RawView,
  Preview,
  /** utils */
  convertToRaw,
};
