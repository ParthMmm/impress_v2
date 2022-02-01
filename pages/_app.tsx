import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../styles/theme';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NProgress from 'nprogress'; //nprogress module
// import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';

import 'styles/nprogress.css';
const queryClient = new QueryClient();

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
