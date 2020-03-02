import { RichEditorPlugin, RichEditorPluginProps } from './types';
import LinkStrategy from './LinkStrategy';
import DecoratedLink from './DecoratedLink';

const createHashtagPlugin: RichEditorPlugin<RichEditorPluginProps> = (props) => {
  const { component } = props;
  const linkStrategy = new LinkStrategy('HASHTAG');

  const decorator = linkStrategy.getDecorator(component || DecoratedLink);
  return {
    decorators: [decorator],
    decorator,
  };
};

export default createHashtagPlugin;
