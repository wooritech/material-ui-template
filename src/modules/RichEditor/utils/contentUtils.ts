/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, SelectionState, ContentBlock, Modifier, RichUtils } from 'draft-js';
import SelectInput from '@material-ui/core/Select/SelectInput';
// @types 없음.
// import { setBlockData } from 'draftjs-utils';

class ContentUtils {
  static setBlockData = (editorState: EditorState, data: Immutable.Map<any, any>) => {
    const newContentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      data,
    );
    return EditorState.push(editorState, newContentState, 'change-block-data');
  };

  static getSelectionBlock = (editorState: EditorState) => {
    return editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getAnchorKey());
  };

  static getSelectionBlockData = (editorState: EditorState, name?: string) => {
    const blockData = ContentUtils.getSelectionBlock(editorState).getData();
    return name ? blockData.get(name) : blockData;
  };

  static setSelectionBlockData = (
    editorState: EditorState,
    blockData: Record<any, any>,
    override?: boolean,
  ) => {
    const newBlockData = override
      ? blockData
      : { ...ContentUtils.getSelectionBlockData(editorState).toJS(), ...blockData };

    Object.keys(newBlockData).forEach((key) => {
      if (newBlockData.hasOwnProperty(key) && newBlockData[key] === undefined) {
        delete newBlockData[key];
      }
    });
    // console.log(newBlockData);
    return ContentUtils.setBlockData(editorState, newBlockData);
  };

  /** toggleSelectionAlignment */
  static toggleSelectionAlignment = (editorState: EditorState, alignment: string | undefined) => {
    return ContentUtils.setSelectionBlockData(editorState, {
      textAlign:
        ContentUtils.getSelectionBlockData(editorState, 'textAlign') !== alignment
          ? alignment
          : undefined,
    });
  };

  /** 선택 범위에 있는 link entity 정보와 selection 정보를 돌려준다. */
  static getLinkInstance = (editorState: EditorState) => {
    const selection = editorState.getSelection();

    const contentState = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    if (linkKey) {
      return contentState.getEntity(linkKey);
    }

    return undefined;
  };

  static getLinkUrl = (editorState: EditorState) => {
    const link = ContentUtils.getLinkInstance(editorState);
    if (link) {
      const data = link.getData();
      return data.url;
    }
    return '';
  };

  /** 선택 범위에 링크 추가 */
  static confirmLink = (editorState: EditorState, url: string, href: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      url,
      href,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const linkedState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey,
    );
    return EditorState.forceSelection(linkedState, linkedState.getSelection());
  };

  /** 링크제거 */
  static removeLink = (editorState: EditorState) => {
    const selection = editorState.getSelection();
    const linkedState = RichUtils.toggleLink(editorState, selection, null);
    return EditorState.forceSelection(linkedState, linkedState.getSelection());
  };

  /** 블럭 선택 */
  static selectBlock = (editorState: EditorState, block: ContentBlock) => {
    const blockKey = block.getKey();

    return EditorState.forceSelection(
      editorState,
      new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
      }),
    );
  };

  /** 블럭 선택 */
  static selectCurrent = (editorState: EditorState) => {
    return EditorState.forceSelection(editorState, editorState.getSelection());
  };

  static getLinkSelection = (editorState: EditorState, selection: SelectionState) => {
    return new SelectionState(selection);
  };
}

export default ContentUtils;
