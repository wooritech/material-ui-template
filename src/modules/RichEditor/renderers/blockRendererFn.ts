import { ContentBlock } from 'draft-js';
import { Media } from '../components/Media';

/**
 *
 */
const blockRendererFn = (block: ContentBlock) => {
  const type = block.getType();
  if (type === 'atomic') {
    return {
      component: Media,
      editable: false,
      /** 커스텀 프로퍼티 */
      props: {
        foo: 'bar',
      },
    };
  }
  return null;
};

export default blockRendererFn;
