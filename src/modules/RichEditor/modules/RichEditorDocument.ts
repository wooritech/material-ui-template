/* eslint-disable @typescript-eslint/no-explicit-any */
import { Record } from 'immutable';
import { EditorState, RawDraftContentState } from 'draft-js';

export interface RawRichContentState extends RawDraftContentState {
  toc?: any;
}

export interface RichLanguageRaws {
  // any 없으면 타입오류
  // DraftInlineStyleType 타입의 리터럴 타입에 있는 값을 넣어 주었는데 오류가 생기는 이유는???
  [language: string]: RawRichContentState | any;
}

export interface RichDocumentRaw {
  id: string;
  title: string;
  raws: RichLanguageRaws;
  children: RichEditorDocument[];
}

const defaultValue: Partial<RichDocumentRaw> = {
  id: '',
  title: '',
  raws: {
    kr: {},
    en: {},
  },
};

/**
 * RichEditor 컴포넌트에서 사용되는 문서 타입.
 * 임시로 만든 구조이고 필요하면 변경 하면 된다.
 *
 * 편집을 원하는 언어가 문서에 없으면 외부에서 추가.
 *
 * @properties
 *   - @id
 *   - @title
 *   - @defaultLanguage
 *   - @raws : 언어별 실제 문서 raw 를 가지고 있다.
 *     - @lang [lang: string] raw 는 Draft.RawDraftContentState
 */
export default class RichEditorDocument extends Record(defaultValue) implements RichDocumentRaw {
  public constructor(doc?: Partial<RichDocumentRaw>) {
    if (doc) super(doc);
    else super(defaultValue);
  }

  get title(): string {
    return this.get('title');
  }

  get id(): string {
    return this.get('id');
  }

  get defaultLanguage(): string {
    return this.get('defaultLanguage');
  }

  get raws(): RichLanguageRaws {
    return this.get('raws');
  }

  /** !! 하나로 합치는건 무의미한다. */
  get state(): EditorState {
    return this.get('state');
  }

  get languages(): string[] {
    return Object.keys(this.raws);
  }

  get children(): RichEditorDocument[] {
    return this.get('children');
  }

  /** Imutable.Map(<string, any>) */
  setTitle(title: string): RichEditorDocument {
    return this.set('title', title) as RichEditorDocument;
  }

  /** 특정언어의  */
  getRaw(language: string): RawDraftContentState | any {
    return this.raws[language];
  }

  /** 특정언어의 raw 를 입력한다. 기존에 있는 경우 덮어쓰게 된다. */
  setRaw(raw: RawDraftContentState | any, language: string): RichEditorDocument {
    return this.setIn(['raws', language], raw) as RichEditorDocument;
  }
}
