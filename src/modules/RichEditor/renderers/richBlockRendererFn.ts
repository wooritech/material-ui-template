import { ContentBlock } from 'draft-js';
import { Media, Table } from '../components';
import { EventRichCommand } from '../types';

const atomicRenderer = (onRichCommand: EventRichCommand) => {
  return {
    component: Media,
    editable: false,
    /** 커스텀 프로퍼티 */
    props: {
      command: onRichCommand,
    },
  };
};

const tableRenderer = (onRichCommand: EventRichCommand) => {
  return {
    component: Table,
    editable: false,
    /** 커스텀 프로퍼티 */
    props: {
      command: onRichCommand,
    },
  };
};

/**
 *
 */
const richBlockRendererFn = (onRichCommand: EventRichCommand) => {
  return (block: ContentBlock) => {
    const type = block.getType();

    if (type === 'atomic') return atomicRenderer(onRichCommand);
    if (type === 'table') return tableRenderer(onRichCommand);

    return null;
  };
};

export default richBlockRendererFn;
