/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentState, ContentBlock, SelectionState } from 'draft-js';

/**
 * 
 * Custom Block Component에 넘어 오는 props:
    contentState: ContentState {_map: Map, __ownerID: undefined}
    block: ContentBlock {_map: Map, __ownerID: undefined}
    blockProps: {foo: "bar"}
    blockStyleFn: ƒ blockStyleFn(block)
    customStyleMap: {BOLD: {…}, CODE: {…}, ITALIC: {…}, STRIKETHROUGH: {…}, UNDERLINE: {…}, …}
    customStyleFn: undefined
    decorator: CompositeDraftDecorator {_decorators: Array(3)}
    direction: "LTR"
    forceSelection: true
    offsetKey: "d9t34-0-0"
    selection: SelectionState {_map: Map, __ownerID: undefined}
    tree: List {size: 1, _origin: 0, _capacity: 1, _level: 5, _root: null, …}
 */
export interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: Record<any, any>;
  selection: SelectionState;
}

/** decorator component에 넘어 오는 props 예 */
// contentState: ContentState {_map: Map}
// decoratedText: "링크"
// dir: null
// start: 4
// end: 6
// blockKey: "46ea1"
// entityKey: "58"
// offsetKey: "46ea1-1-0"
// children: [{…}]
export interface DecoratedComponentProps {
  contentState: ContentState;
  decoratedText: string;
  // dir: null
  start: number;
  end: number;
  blockKey: string;
  entityKey: string;
  offsetKey: string;
}
