import { DraftDecorator } from 'draft-js';
import { EditorPlugin } from 'draft-js-plugins-editor';

/**
 * linkify-it 패키지로 대체 가능
 * import linkifyIt from 'linkify-it';
 * import tlds from 'tlds';
 * const linkify = linkifyIt();
 * linkify.tlds(tlds);
 */

export type LinkType = 'URL' | 'EMAIL' | 'HASHTAG';

/**
 * 스트래터지 callback 인자 타입
 */
export type StrategyCallback = (start: number, end: number) => void;

/**
 * decorator에 넘겨중 component를 인자로 받는다.
 */
export interface RichEditorPluginProps {
  component?: React.FC;
}

export type RichEditorPlugin<RichEditorPluginProps> = (
  props: RichEditorPluginProps,
) => EditorPlugin & { decorator: DraftDecorator };
