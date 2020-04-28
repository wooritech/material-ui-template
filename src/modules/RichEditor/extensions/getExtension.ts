import { ContentBlock } from 'draft-js';
import { BlockUtils } from '../utils';
import { RichEditorConfig } from '../configs';

/** 현재 선택된 블럭의 타입에 따라 보여줄 extension type을 돌려준다.  */
const getExtension = (block: ContentBlock, richConfig: RichEditorConfig): string | undefined => {
  if (block.getType() === 'realgrid') return 'realgrid';
  return undefined;
};

export default getExtension;
