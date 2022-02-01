import React, { ReactElement } from 'react';
import { Flex, Box, Grid, GridItem, Spacer, Spinner } from '@chakra-ui/react';
import Posts from './Post/Posts';
import Sidebar from './Sidebar/Sidebar';
import client from '../app/request-client';
import { useGetTotalPostsQuery } from '../generates';
interface Props {}

function Landing({}: Props): ReactElement {
  const totalQuery = useGetTotalPostsQuery(client);

  if (totalQuery.data?.getTotalPosts) {
    return (
      <>
        <Flex
          h={'100%'}
          maxW={'70%'}
          margin-left={'auto'}
          margin-right={'auto'}
          justifyContent={'space-evenly'}
          zIndex={0}
          overflowY={'hidden'}
        >
          <Box />
          <Posts totalPosts={totalQuery.data?.getTotalPosts} />
          <Sidebar />
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Flex
          h={'100%'}
          maxW={'70%'}
          margin-left={'auto'}
          margin-right={'auto'}
          justifyContent={'space-evenly'}
          zIndex={0}
          overflowY={'hidden'}
        >
          <Box />
          <Spinner />
          <Sidebar />
        </Flex>
      </>
    );
  }
}

export default Landing;
