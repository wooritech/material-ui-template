/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

class MdUtils {
  // 이런 형식으로 플러그인을 만들어서 커스텀한 문구를 변환할 수 있다.
  static realgridPlugin = (md: any, options: any) => {
    // console.log(md, options);
    // 여기서 새로운 ruler를 만들어 추가 하거나 기존 ruler를 변경 할 수도 있다.
    // md.block.ruler.push 또는 md.inline.ruler.before 와 같이 사용

    // inline parser 예제,
    // 조건이 맞으면 state.push() 로 추가한 토큰의 타입에 해당하는 blockEntities 함수 실행.
    const inlineParser = (state: any, silent: any) => {
      if (!state.src) return false;

      // {{text}} 의 형식인지 확인한다.
      if (state.src[state.pos] === '{' && state.src[state.pos + 1] === '{') {
        const endBrPos = state.src.indexOf('}}', state.pos);
        if (endBrPos > -1) {
          const content = state.src.slice(state.pos + 2, endBrPos);
          console.log(endBrPos, state.src.slice(state.pos + 2, endBrPos), state.tokens);
          if (!silent) {
            state.push({
              type: 'realgrid_open',
              level: state.level,
            });
          }
          // pos를 이동시켜주지 않으면 다음 src를 읽지 않기 때문에 무한 루프에 빠질 수 있다.
          state.pos += endBrPos + 2;
          return true;
        }
      }
    };

    /**
     * 형식
     * {{demo_id}}
     *
     * 또는
     *
     * {{demo_id
     *  another data (아직 미정)
     * }}
     */
    const realgridDemoParser = (
      state: any,
      startLine: number,
      endLine: number,
      silent: boolean,
    ) => {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      const max = state.eMarks[startLine];
      // console.log('마커 시작 위치 pos: ', pos, ', 마커 끝 위치 max: ', max);

      // {{열고 }}닫고 최소한 4 char 이상이어야 한다.
      if (pos + 2 >= max) return false;

      const marker = state.src.charCodeAt(pos);
      // console.log('marker:', marker);

      // 123 = '{'
      if (marker !== 123) return false;

      const mem = pos;
      // pos 이후 다른 char 가 나오는 위치 반환
      pos = state.skipChars(pos, marker);

      // 두개의 '{' 필요
      if (pos - mem !== 2) return false;
      // console.log('RealGrid Demo Parsed');

      const line = state.src.slice(pos, max).trim();
      // console.log(' line: ', line);

      let sep = line.indexOf('}}');
      // 첫줄에 종료마커가 위치한 경우는 한 줄로 구성된 경우임.
      const isSingleLine = sep !== -1;
      if (isSingleLine) sep = line.length - 2;
      const demoId = line.slice(0, sep);
      // console.log(' demoId: ', demoId);

      if (demoId === '') return false;

      if (silent) return true;

      /**
       * 종료 마커가 들어 있는 마지막 라인 찾기
       * - 한 라인에 종료마커가 들어 있지 않은 경우에만 다음 라인을 읽을 필요가 있다.
       */
      let nextLine = startLine;
      let hasEnding = false;

      while (nextLine < endLine) {
        // console.log('loop: ', nextLine, endLine, isSingleLine);
        nextLine += 1;

        if (isSingleLine) break;

        if (nextLine >= endLine) break;

        const nextPos = state.bMarks[nextLine] + state.tShift[nextLine];
        const nextMax = state.eMarks[nextLine];

        // '}' = 125
        if (state.src.charCodeAt(nextPos) !== 125) continue;

        const nextLineText = state.src.slice(nextPos, nextMax).trim();
        // console.log('next line text: ', nextLineText);

        if (nextLineText === '}}') {
          hasEnding = true;
          break;
        }
      }

      // console.log(' startLine: ', startLine, ' nextLine: ', nextLine);

      // Ensure nested parsing stops at delimiting block
      const oldMax = state.lineMax;
      state.lineMax = nextLine + (hasEnding ? -1 : 0);
      const oldParentType = state.parentType;
      state.parentType = 'demoId' as any;
      // console.log(' oldParentType: ', oldParentType, 'parentType: ', state.parentType);

      let lines;

      // Let register token and progress
      state.tokens.push({
        type: 'realgridDemo_open',
        level: state.level,
        lines: lines = [startLine, nextLine],
        demoId,
      } as any);
      // state.parser.tokenize(state, startLine + 1, nextLine);
      state.tokens.push({
        type: 'realgridDemo_close',
        level: state.level,
      } as any);

      // Revert
      lines[1] = nextLine;
      state.line = nextLine + (hasEnding ? 1 : 0);
      state.lineMax = oldMax;
      state.parentType = oldParentType;

      // console.log('RealGrid Demo Parse End');
      return true;
    };

    md.block.ruler.before('code', 'realgridDemo', realgridDemoParser, options);
  };
}

const defaultMdConvertOptions = {
  // remarkablePreset: 'commonmark',
  /** option은 remarkable 참조: https://github.com/jonschlinkert/remarkable */
  remarkablePlugins: [MdUtils.realgridPlugin],
  blockTypes: {
    realgridDemo_open: (item: any) => {
      // console.log('blockTypes', item);
      return {
        type: 'realgrid-demo',
        text: '',
        entityRanges: [],
        inlineStyleRanges: [],
        data: {
          id: item.demoId,
        },
      };
    },
  },
  // 빈 라인 처리, 이 처리를 위해 type def 를 수정해야 한다.
  preserveNewlines: true,
  remarkableOptions: {
    html: true,
    disable: {
      // inline: ['links', 'emphasis'],
      // block: ['heading'],
    },
    enable: {
      block: 'table',
      core: ['abbr'],
    },
  },
};

export { MdUtils, defaultMdConvertOptions };
