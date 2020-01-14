/**
 * ESLint 설정 파일
 * - https://eslint.org/docs/user-guide/configuring
 * - 타입스크립트 지원
 *   - https://github.com/typescript-eslint/typescript-eslint
 */
module.exports = {
  extends: [
    // 우리테크 표준 린트 설정
    // - https://github.com/wooritech/eslint/tree/master/packages/eslint-config
    '@wooritech/eslint-config',
    // TS 파일 임포트 설정
    // - https://github.com/benmosher/eslint-plugin-import#typescript
    'plugin:import/typescript',
    // 타입스크립트 권장 설정
    'plugin:@typescript-eslint/recommended',
    // prettier와 @typescript-eslint간의 충돌나는 규칙 비활성화
    'prettier/@typescript-eslint',
    // prettier와 eslint-plugin-react간의 충돌나는 규칙 비활성화
    'prettier/react',
    // prettier와 eslint간의 충돌나는 규칙 비활성화
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    // 타입스크립트 규칙 지원
    // - https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
    '@typescript-eslint',
    // jest 규칙 지원
    // - https://github.com/jest-community/eslint-plugin-jest#rules
    'jest',
  ],
  rules: {
    /**
     * 자바스크립트 규칙
     */
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] },
    ],
    /**
     * 타입스크립트 규칙
     */
    '@typescript-eslint/no-empty-interface': 'off', // 멤버가 없는 인터페이스 허용
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환타입 추론 허용
    /**
     * 리액트 규칙
     */
    'react/prop-types': 'off', // prop 타입 검사 비활성화
    'react/jsx-one-expression-per-line': 'off', // 한 줄에 다수 표현식 허용
    // anchor 태그의 속성 검사 비활성화
    // - https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/402
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/react-in-jsx-scope': 'off', // React 변수 임포트를 강제하지 않음 (babel-plugin-react-require)
  },
  env: {
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: ['.tsx', '.ts'],
      },
    },
  },
};
