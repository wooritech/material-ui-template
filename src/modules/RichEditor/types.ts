/* eslint-disable @typescript-eslint/no-explicit-any */
import { RawDraftContentState } from 'draft-js';
// import RichEditorState from './RichEditorState';
// import RichEditorDocument from './RichEditorDocument';

export interface RichLanguageRaws {
  // any 없으면 타입오류
  // DraftInlineStyleType 타입의 리터럴 타입에 있는 값을 넣어 주었는데 오류가 생기는 이유는???
  [language: string]: RawDraftContentState | any;
}

export interface RichDocumentRaw {
  id: string;
  title: string;
  raws: RichLanguageRaws;
}

/** 일단 모든 타입이 결정되면 그때 나열하거나 그냥 any 타입을 쓰는게 나을 수도 있다. */
export type TypeRichCommandValue = any; // string | RichEditorState | RichEditorDocument;
export type EventRichCommand = (command: string, value?: TypeRichCommandValue) => void;
