import * as React from 'react';
import { RichEditorState } from '../../modules';
import { ContentUtils, BlockUtils } from '../../utils';

interface StatusBarProps {
  richState: RichEditorState;
}

/**
 * StatusBar
 *
 * 지저분해 질것 같아서 컴포넌트로 분리
 *
 */
const StatusBar: React.FC<StatusBarProps> = (props) => {
  const { richState } = props;

  const status = (state: RichEditorState) => {
    const block = ContentUtils.getSelectionBlock(state).toJS();
    const inlineStyle = state.getCurrentInlineStyle();
    const outs: string[] = [];
    if (block.key) outs.push(block.key);
    if (block.type) outs.push(block.type);
    if (inlineStyle.count() > 0) outs.push(JSON.stringify(inlineStyle));
    outs.push(BlockUtils.isEmptyBlock(state.getCurrentContent(), state.getSelection()).toString());
    return outs.join(' / ');
  };

  return <div>{status(richState)}</div>;
};

export default StatusBar;

/*

- [ ] divider 로 분리
- [ ] 표시할 상태 항목을 옵션으로 처리 

*/
