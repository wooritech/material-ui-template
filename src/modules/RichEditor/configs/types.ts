import { ButtonItemConfig } from '../components/ToolButtons';

export type RichEditorToolbarNames =
  | string
  | 'Divider'
  | 'UndoRedo'
  | 'Alignment'
  | 'HeadingStyle'
  | 'InlineStyle'
  | 'BlockStyle'
  | 'Extension'
  | 'Image'
  | 'Table'
  | 'CodeDirector';

export type RichEditorControls = {
  name: RichEditorToolbarNames;
  type: string | 'BUTTONGROUP' | 'POPPER' | 'DIVIDER';
  /** button group 인 경우는 배열로, popper인 경우 하나의 버튼그룹만 넘겨준다. divider 인 경우는 undefined */
  buttons?: ButtonItemConfig | ButtonItemConfig[];
};

/**
 * 툴바를 구성하기 위해 config 를 생성하는 방법
 *   1. configs.defaultToolbarConfig 를 참고하여 직접 config 객체를 만들어도 되고
 *   2. configs.getToolbarConfigs() 함수를 사용해 원하는 컨트롤들만 보이게 할 수도 있다.
 */
export type RichEditorToolbarConfig = RichEditorControls[];
