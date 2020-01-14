/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */
/**
 * Next.js 설정 파일
 * - https://nextjs.org/docs#custom-configuration
 * - next.config.ts 만들지 않은 이유
 *  - https://github.com/zeit/next.js/issues/5318#issuecomment-425398180
 */
const path = require('path');

const config = {
  webpack: (webpackConfig) => {
    // 자주 사용되는 최상위 경로 별칭
    webpackConfig.resolve.alias['~'] = path.resolve(`${__dirname}/src`);
    return webpackConfig;
  },
  publicRuntimeConfig: {
    env: process.env.ENV,
  },
};

// Webpack Bundle Analyzer 적용
// - https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(config);
