import { ContentBlock } from 'draft-js';
import { Media } from '../components';
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

/**
 *
 */
const richBlockRendererFn = (onRichCommand: EventRichCommand) => {
  return (block: ContentBlock) => {
    const type = block.getType();

    if (type === 'atomic') return atomicRenderer(onRichCommand);

    return null;
  };
};

export default richBlockRendererFn;
