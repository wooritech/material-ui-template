import { EditorState } from 'draft-js';
import { ButtonItemConfig } from '../components/ToolButtons/types';
import { EventRichCommand, ToolbarState } from '../types';

/**
 * 공개된 컨트롤 타입은 일단 Popper와 Button 이 있다.
 */
export interface EditorControlsProps {
  editorState: EditorState;
  // popper인 경우 buttonItem 하나만 있으면 된다.
  buttonItems: ButtonItemConfig | ButtonItemConfig[];
  toolbarState: ToolbarState;
  onRichCommand?: EventRichCommand;
  onToggle?: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
  startDivider?: boolean;
  endDivider?: boolean;
}
