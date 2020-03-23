import { EditorState } from 'draft-js';
import { ButtonItemConfig } from '../components/ToolButtons/types';
import { EventRichCommand } from '../types';
import { RichEditorConfig } from '../configs';

/**
 * 공개된 컨트롤 타입은 일단 Popper와 Button 이 있다.
 */
export interface EditorControlsProps {
  richConfig: RichEditorConfig;
  editorState: EditorState;
  // popper인 경우 buttonItem 하나만 있으면 된다.
  buttonItems: ButtonItemConfig | ButtonItemConfig[];
  onRichCommand?: EventRichCommand;
  onToggle?: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
  startDivider?: boolean;
  endDivider?: boolean;
}
