/* eslint-disable @typescript-eslint/no-explicit-any */

/** 일단 모든 타입이 결정되면 그때 나열하거나 그냥 any 타입을 쓰는게 나을 수도 있다.
 *   - string 을 포함하지 않아도 되는 방법을 찾아야 한다.
 */
export type TypeRichCommand =
  | string
  | 'save'
  | 'load'
  | 'change-state'
  | 'change-ext-mode'
  | 'change-title';
export type TypeRichCommandValue = any; // string | RichEditorState | RichEditorDocument;
export type EventRichCommand = (
  command: TypeRichCommand,
  value?: TypeRichCommandValue,
  callback?: (v: any) => void,
) => void;
