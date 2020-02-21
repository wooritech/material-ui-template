/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState } from 'draft-js';
import { ComponentBaseProps } from '~/components/types';

// export type EditorState = _EditorState & {
//   toHTML(options?: Record<string, any>): string;
// };

export interface StyleControlsProps extends ComponentBaseProps {
  editorState: EditorState;
  onToggle: (blockType: string) => void;
}

export interface StyleButtonProps extends ComponentBaseProps {
  key: string;
  active: boolean;
  label: string;
  onToggle: (blockType: string) => void;
  style: string;
}
