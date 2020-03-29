import { ContentBlock, EditorState } from 'draft-js';
import { Media } from '../components';
import { EventRichCommand } from '../types';

/**
 *
 */
const richBlockRendererFn = (onBlockRendererCommand: EventRichCommand) => {
  return (block: ContentBlock) => {
    const type = block.getType();
    if (type === 'atomic') {
      return {
        component: Media,
        editable: false,
        /** 커스텀 프로퍼티 */
        props: {
          foo: 'bar',
          command: onBlockRendererCommand,
        },
      };
    }
    return null;
  };
};

export default richBlockRendererFn;
