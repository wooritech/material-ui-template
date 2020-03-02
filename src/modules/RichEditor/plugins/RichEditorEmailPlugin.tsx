import { RichEditorPlugin, RichEditorPluginProps } from './types';
import LinkStrategy from './LinkStrategy';
import DecoratedLink from './DecoratedLink';

const createEmailPlugin: RichEditorPlugin<RichEditorPluginProps> = (props) => {
  const { component } = props;
  const linkStrategy = new LinkStrategy('EMAIL');

  const decorator = linkStrategy.getDecorator(component || DecoratedLink);
  return {
    decorators: [decorator],
    decorator,
  };
};

export default createEmailPlugin;
