/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import { ConvertUtils } from '~/modules/RichEditor/utils';

const Markdown: React.FC = () => {
  const [content, setContent] = React.useState('');
  React.useEffect(() => {
    const md = require(`./sample.md`);
    const html = ConvertUtils.markdownToHTML(md.default /* , config: convert utils 참조 */);
    setContent(html);
  });

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Markdown;
