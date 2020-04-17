import { ContentBlock, ContentState } from 'draft-js';
import RichLink from '../components/RichLink';
import { StrategyCallback } from './types';

export default {
  strategy: (
    contentBlock: ContentBlock,
    callback: StrategyCallback,
    contentState: ContentState,
  ) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
  },
  component: RichLink,
};
