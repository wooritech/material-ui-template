import { ContentBlock } from 'draft-js';

/**
 * ContentBlock의 조건에 따른 스타일 명을 돌려준다.
 */
const blockStyleFn = (block: ContentBlock) => {
  const align = block.getData().get('textAlign');
  if (align) return `RichEditor-align-${align}`;

  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return '';
  }
};

export default blockStyleFn;
