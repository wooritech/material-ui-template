import { ContentBlock } from 'draft-js';
import { Media, RichTable, RichRealGrid } from '../components';
import { EventRichCommand } from '../types';

const atomicRenderer = (onRichCommand: EventRichCommand) => {
  return {
    component: Media,
    editable: false,
    /** 커스텀 프로퍼티 */
    props: {
      onRichCommand,
    },
  };
};

const tableRenderer = (onRichCommand: EventRichCommand) => {
  return {
    component: RichTable,
    editable: false,
    /** 커스텀 프로퍼티 */
    props: {
      onRichCommand,
    },
  };
};

const realgridRenderer = (onRichCommand: EventRichCommand) => {
  return {
    component: RichRealGrid,
    editable: false,
    props: {
      onRichCommand,
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
    if (type === 'realgrid') return realgridRenderer(onRichCommand);
    if (type === 'realgrid-demo') return realgridRenderer(onRichCommand);

    return null;
  };
};

export default richBlockRendererFn;
