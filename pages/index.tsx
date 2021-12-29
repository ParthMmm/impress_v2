import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../components/Landing';
import { Box } from '@chakra-ui/react';
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Impress</title>
        <meta name='description' content='Share mechanical switches' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box h={'100vh'}>
        <Landing />
      </Box>
    </>
  );
};

export default Home;
