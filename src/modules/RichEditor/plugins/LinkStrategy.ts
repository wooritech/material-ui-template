/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import { ContentBlock, ContentState } from 'draft-js';
import { StrategyCallback, LinkType } from './types';
import * as Utils from './utils';

/** EMAIL regex */
export const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
/** URL regex */
const URL_REGEX = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g;
/** HASHTAG regex */
export const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g; // or /(^|\s)#\w+/g

/**
 *
 */
export default class LinkStrategy {
  linkType: LinkType;

  constructor(type: LinkType) {
    this.linkType = type;
  }

  private get regex(): RegExp | undefined {
    switch (this.linkType) {
      case 'URL':
        return URL_REGEX;
      case 'EMAIL':
        return EMAIL_REGEX;
      case 'HASHTAG':
        return HASHTAG_REGEX;
      default:
        return undefined;
    }
  }

  /**
   *
   * @param component if not null 외부 decorated component 적용
   */
  public getDecorator(component: React.FC) {
    return {
      strategy: (
        contentBlock: ContentBlock,
        callback: StrategyCallback,
        contentState: ContentState,
      ) => {
        const findText = contentBlock.getText();
        const { regex } = this;
        const onEachFound = (start: number, end: number) => {
          console.log('엔터티 추가', start, end);
          callback(start, end);
        };
        if (regex) Utils.findWithRegex(regex, findText, onEachFound);
      },
      component,
    };
  }
}
