/* eslint-disable react/jsx-props-no-spreading */

/**
 * 커스텀 App 설정
 * - https://nextjs.org/docs#custom-app
 */
import React from 'react';
import App from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '~/themes';
import projectTheme from '~/themes/project';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext: any) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //   console.log(appContext, appProps);

  //   return { ...appProps };
  // }

  render() {
    const { Component, pageProps, router } = this.props;
    // 임시: 경로 정보를 이용해 테마가 선택되도록...
    const isProject = router.asPath.startsWith('/edit');
    const currentTheme = isProject ? projectTheme : theme;

    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
