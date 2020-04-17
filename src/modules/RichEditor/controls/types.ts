import { EditorState } from 'draft-js';
import { ButtonItemType } from '../components';
import { EventRichCommand } from '../types';
import { RichEditorConfig } from '../configs';

/**
 * 공개된 컨트롤 타입은 일단 Popper와 Button 이 있다.
 * 나중에는 TextField 같은 input 컨트롤도 추가될 수있다.
 *
 * @typeParam richConfig: RichEditorConfig;
 * @property editorState: EditorState;
 * @property buttonItems: ButtonItemType | ButtonItemType[]; popper인 경우 buttonItem 하나만 있으면 된다.
 * @property onRichCommand?: EventRichCommand;
 * @property onToggle?: (blockType: string) => void;
 * @property onChange?: (editorState: EditorState) => void;
 * @property startDivider?: boolean;
 * @property endDivider?: boolean;
 */
export interface EditorControlsProps {
  richConfig: RichEditorConfig;
  editorState: EditorState;
  // popper인 경우 buttonItem 하나만 있으면 된다.
  buttonItems: ButtonItemType | ButtonItemType[];
  readOnly: boolean;
  onRichCommand: EventRichCommand;
  onToggle?: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
  startDivider?: boolean;
  endDivider?: boolean;
}
