import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '@/components/Landing';
import Header from '@/components/Header';
import client from '@/app/request-client';
import { useCurrentUserQuery } from '../generates';
import { Box } from '@chakra-ui/react';
import BottomNav from '@/components/BottomNav/BottomNav';

const Home: NextPage = () => {
  const { data } = useCurrentUserQuery(client);

  return (
    <>
      <Head>
        <title>Impress</title>
        <meta name='description' content='Share mechanical switches' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Box h='100%' overflowY={'hidden'}>
        <Landing />
      </Box>

      <Box visibility={{ base: 'visible', md: 'visible', lg: 'hidden' }}>
        <BottomNav />
      </Box>
    </>
  );
};

export default Home;
