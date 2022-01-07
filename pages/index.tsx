import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../components/Landing';
import Header from '../components/Header';
import client from '../app/request-client';
import { useCurrentUserQuery } from '../generates';
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

      <Landing />
    </>
  );
};

export default Home;
