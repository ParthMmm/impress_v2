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
          w={{ base: '100%', md: '100%', lg: '95%' }}
          margin-left={'auto'}
          margin-right={'auto'}
          justifyContent={{
            base: 'center',
            sm: 'space-evenly',
            md: 'space-evenly',
          }}
          // aligns={'center'}
          zIndex={0}
          overflowY={'hidden'}
          // flexFlow={'wrap row'}
        >
          <Box
            width={{ base: '0px', md: '0rem', lg: '0rem', xl: '21.875rem' }}
          />
          <Posts totalPosts={totalQuery.data?.getTotalPosts} />
          <Box visibility={{ base: 'hidden', md: 'hidden', lg: 'visible' }}>
            <Sidebar />
          </Box>
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
