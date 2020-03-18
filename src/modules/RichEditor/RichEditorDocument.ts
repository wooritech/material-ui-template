/* eslint-disable @typescript-eslint/no-explicit-any */
import { Record } from 'immutable';
import { EditorState, RawDraftContentState } from 'draft-js';
import { RichDocumentRaw, RichLanguageRaws } from './types';

const defaultValue: Partial<RichDocumentRaw> = {
  id: '',
  title: '',
  raws: {
    kr: {
      blocks: [
        {
          key: 'empty-key',
          text: '',
          type: '',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
    en: {},
  },
};

/**
 * RichEditor 컴포넌트에서 사용되는 문서 타입.
 * 임시로 만든 구조이고 필요하면 변경 하면 된다.
 *
 * 문제는 defaultValue의 구조를 가지고 객체를 다시 정의 하기 때문에
 * defaultValue에 없는 구조는 Immutable 데이터로 만들어 지지 않는다.
 *
 * @properties
 *   - @id
 *   - @title
 *   - @raws : 언어별 실제 문서 raw 를 가지고 있다.
 *     - @lang [lang: string] raw 는 Draft.RawDraftContentState
 */
export default class RichEditorDocument extends Record(defaultValue) implements RichDocumentRaw {
  private languages: string[];

  public constructor(doc?: Partial<RichDocumentRaw>) {
    if (doc) super(doc);
    else super(defaultValue);

    this.languages = [];
  }

  get title(): string {
    return this.get('title');
  }

  get id(): string {
    return this.get('id');
  }

  get raws(): RichLanguageRaws {
    return this.get('raws');
  }

  get state(): EditorState {
    return this.get('state');
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
  setRaw(raw: RawDraftContentState | any, language: string) {
    return this.setIn(['raws', language], raw);
  }

  getLanguages(): string[] {
    return Object.keys(this.raws);
  }
}
