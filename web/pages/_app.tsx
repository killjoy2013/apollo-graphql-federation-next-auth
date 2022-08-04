import 'styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { useApollo } from 'src/apollo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'styles/createEmotionCache';
import theme from 'styles/theme';
import React, { useEffect } from 'react';
import Layout from 'components/layout';
import getConfig from 'next/config';

const clientSideEmotionCache = createEmotionCache();
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const landingPages = ['/landing', '/login'];

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const reloadSession = () => {
  setInterval(() => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  }, (parseInt(publicRuntimeConfig.tokenRefreshPeriod) * 1000) / 2);
};

function MyApp({
  router,
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const client = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    reloadSession();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>MUI5 Nextjs</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <ApolloProvider client={client}>
            {landingPages.includes(router.pathname) && (
              <Component {...pageProps} />
            )}

            {!landingPages.includes(router.pathname) && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ApolloProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
