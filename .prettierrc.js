/**
 * Prettier 설정 파일
 * - https://prettier.io/docs/en/options.html
 * - eslint-plugin-prettier를 사용할 경우 다른 eslint 규칙보다 우선됨
 */
module.exports = {
  printWidth: 100, // 한 줄 길이
  tabWidth: 2, // 들여쓰기 간격
  semi: true, // 세미콜론(;) 사용
  singleQuote: true, // 작은 따옴표(') 사용
  trailingComma: 'all', // 멀티 라인시, 맨 끝 콤마 사용
  bracketSpacing: true, // 객체 리터럴의 괄호 사이에 띄어쓰기
  jsxBracketSameLine: false, // JSX의 닫는 괄호를 다음 라인에 추가
  arrowParens: 'always', // 화살표 함수 사용 시, 매개변수 괄호 사용
};
