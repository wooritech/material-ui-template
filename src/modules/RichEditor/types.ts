/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState } from 'draft-js';
import { ComponentBaseProps } from '~/components/types';

// export type EditorState = _EditorState & {
//   toHTML(options?: Record<string, any>): string;
// };

export interface EditorControlsProps extends ComponentBaseProps {
  editorState: EditorState;
  onToggle?: (blockType: string) => void;
  onChange?: (editorState: EditorState) => void;
}

export interface ToolButtonProps extends ComponentBaseProps {
  key: string;
  active: boolean;
  label: string;
  onToggle?: (blockType: string) => void;
  onClick?: (event: MouseEvent) => void;
  style: string;
  icon?: string;
}
