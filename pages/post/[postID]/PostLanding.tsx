import React from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Header from '@/components/Header';
import PostPage from '@/components/Post/PostPage';
import Sidebar from '@/components/Sidebar/Sidebar';

type Props = {};

function PostLanding({}: Props) {
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
        zIndex={0}
        overflowY={'hidden'}
        mt='32'
      >
        <Box width={{ base: '0px', md: '0rem', lg: '0rem', xl: '21.875rem' }} />
        <PostPage />
        <Box visibility={{ base: 'hidden', md: 'hidden', lg: 'visible' }}>
          <Sidebar />
        </Box>
      </Flex>
    </>
  );
}

export default PostLanding;
