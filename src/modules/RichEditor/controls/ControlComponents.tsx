/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import UndoRedoControls from './UndoRedoControls';
import HeadingStyleControls from './HeadingStyleControls';
import BlockStyleControls from './BlockStyleControls';
import AlignmentControls from './AlignmentControls';
import InlineStyleControls from './InlineStyleControls';
import MultiLanguageControls from './MultiLanguageControls';
import ExtensionControls from './ExtensionControls';
import ImageControls from './ImageControls';
import TableControls from './TableControls';
import CodeDirectorControls from './CodeDirectorControls';

import { EditorControlsProps } from './types';

interface Props extends EditorControlsProps {
  name: string;
}

/**
 * control의 이름으로 해당 컨트롤을 찾아온다.
 * Divider는 React.FC로 처리
 */
const Map: { [kay: string]: React.FC | React.FC<EditorControlsProps> } = {
  UndoRedo: UndoRedoControls,
  HeadingStyle: HeadingStyleControls,
  BlockStyle: BlockStyleControls,
  Alignment: AlignmentControls,
  InlineStyle: InlineStyleControls,
  MultiLanguage: MultiLanguageControls,
  Extension: ExtensionControls,
  Image: ImageControls,
  Table: TableControls,
  CodeDirector: CodeDirectorControls,
  Divider,
};

const ControlComponents: React.FC<Props> = (props) => {
  const { name } = props;
  const Compo = Map[name];
  return <Compo {...props} />;
};

export default ControlComponents;
