/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import UndoRedoControls from './UndoRedoControls';
import HeadingStyleControls from './HeadingStyleControls';
import BlockStyleControls from './BlockStyleControls';
import AlignmentControls from './AlignmentControls';
import InlineStyleControls from './InlineStyleControls';
import ExtensionControls from './ExtensionControls';
import ImageControl from './ImageControl';

import { EditorControlsProps } from './types';

interface Props extends EditorControlsProps {
  name: string;
}

const Map: { [kay: string]: React.FC | React.FC<EditorControlsProps> } = {
  UndoRedo: UndoRedoControls,
  HeadingStyle: HeadingStyleControls,
  BlockStyle: BlockStyleControls,
  Alignment: AlignmentControls,
  InlineStyle: InlineStyleControls,
  Extension: ExtensionControls,
  Image: ImageControl,
  Divider,
};

const ControlComponents: React.FC<Props> = (props) => {
  const { name } = props;
  const Compo = Map[name];
  return <Compo {...props} />;
};

export default ControlComponents;
