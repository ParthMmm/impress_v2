import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';
import theme from '../styles/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
