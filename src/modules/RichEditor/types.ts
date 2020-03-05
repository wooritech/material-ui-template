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
