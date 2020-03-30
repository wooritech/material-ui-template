import { RichEditorControls, RichEditorToolbarConfig } from './types';

/**
 * ToolbarSet: 툴바 컨트롤들의 총 집합
 *  - 새로운 툴바가 추가되면 여기에 반드시 추가해 주어야 한다.
 *
 * Controls
 *  - UndoRedo: undo, redo
 *  - HeadingStyle
 *  - BlockStyle:
 *  - Alignment
 *  - InlineStyles
 *  - Image
 *  - Extension
 *  - Table
 *  - CodeDirector
 *  - Divider
 */
const ToolbarSet: RichEditorToolbarConfig = [
  {
    name: 'UndoRedo',
    type: 'BUTTONGROUP',
    buttons: [
      { label: 'Undo', value: 'undo', icon: 'undo_outlined' },
      { label: 'Redo', value: 'redo', icon: 'redo_outlined' },
    ],
  },
  {
    name: 'Divider',
    type: 'DIVIDER',
  },
  {
    name: 'HeadingStyle',
    type: 'POPPER',
    buttons: {
      label: '표준',
      value: 'unstyled',
      options: [
        { label: '표준', value: 'unstyled' },
        { label: '제목 1', value: 'header-one' },
        { label: '제목 2', value: 'header-two' },
        { label: '제목 3', value: 'header-three' },
        { label: '제목 4', value: 'header-four' },
        { label: '제목 5', value: 'header-five' },
        { label: '제목 6', value: 'header-six' },
      ],
    },
  },
  {
    name: 'BlockStyle',
    type: 'BUTTONGROUP',
    buttons: [
      { label: 'Blockquote', value: 'blockquote', icon: 'format_quote' },
      { label: 'UL', value: 'unordered-list-item', icon: 'format_list_bulleted_outlined' },
      {
        label: 'OL',
        value: 'ordered-list-item',
        icon: 'format_list_numbered_outlined',
      },
      { label: 'Code Block', value: 'code-block', icon: 'code' },
    ],
  },
  {
    name: 'Alignment',
    type: 'BUTTONGROUP',
    buttons: [
      { label: 'Left', value: 'left', icon: 'format_align_left' },
      { label: 'center', value: 'center', icon: 'format_align_center' },
      { label: 'right', value: 'right', icon: 'format_align_right' },
      { label: 'justify', value: 'justify', icon: 'format_align_justify' },
    ],
  },
  {
    name: 'InlineStyle',
    type: 'BUTTONGROUP',
    buttons: [
      { label: 'Bold', value: 'BOLD', icon: 'format_bold' },
      { label: 'Italic', value: 'ITALIC', icon: 'format_italic' },
      { label: 'Underline', value: 'UNDERLINE', icon: 'format_underline' },
      { label: 'Monospace', value: 'CODE', icon: 'code' },
    ],
  },
  {
    name: 'Image',
    type: 'BUTTONGROUP',
    // buttons: [{ label: 'Images', value: 'images', icon: 'add_photo_alternate' }],
    buttons: [{ label: 'Images', value: 'images', icon: 'perm_media_outlined' }],
  },
  {
    name: 'Extension',
    type: 'BUTTONGROUP',
    buttons: [
      { label: '다른 언어', value: 'lang', icon: 'g_translate_outlined' },
      { label: '소스보기', value: 'raw', icon: 'settings_ethernet_outlined' },
      { label: '브라우저 보기', value: 'browser', icon: 'language_outlined' },
      { label: 'HTML', value: 'html' },
    ],
  },
  {
    name: 'Table',
    type: 'BUTTONGROUP',
    buttons: [{ label: 'Table', value: 'table', icon: 'grid_on_outlined' }],
  },
  {
    name: 'CodeDirector',
    type: 'BUTTONGROUP',
    buttons: [{ label: 'Code Director', value: 'code-director', icon: 'aspect_ratio_outlined' }],
  },
];

export const getToolbarConfigs = (controlNames: string[]): RichEditorToolbarConfig => {
  return controlNames.map((name) => {
    return ToolbarSet.find((item) => item.name === name) as RichEditorControls;
  });
};

export const defaultToolbarConfig = getToolbarConfigs([
  'UndoRedo',
  'Divider',
  'HeadingStyle',
  'Divider',
  'BlockStyle',
  'Divider',
  'Alignment',
  'Divider',
  'InlineStyle',
  'Divider',
  'Image',
  'Table',
  'CodeDirector',
  'Divider',
  'Extension',
]);
