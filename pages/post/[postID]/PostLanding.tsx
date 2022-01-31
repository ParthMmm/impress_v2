import React from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Header from '@/components/Header';
import PostController from '@/components/Post/PostController';
import Sidebar from '@/components/Sidebar/Sidebar';

type Props = {};

function PostLanding({}: Props) {
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
        <PostController />
        <Sidebar />
      </Flex>
    </>
  );
}

export default PostLanding;