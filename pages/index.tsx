import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../components/Landing';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import {
  dehydrate,
  QueryClient,
  useQuery,
  QueryCache,
  MutationCache,
} from 'react-query';

import client from '../app/request-client';
import { useCurrentUserQuery } from '../generates';
const Home: NextPage = () => {
  const { data } = useCurrentUserQuery(client);

  console.log(data);
  return (
    <>
      <Head>
        <title>Impress</title>
        <meta name='description' content='Share mechanical switches' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <Landing />
    </>
  );
};

// export async function getStaticProps() {}

export default Home;
