import React from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import PostController from '@/components/Post/PostController';
import Header from '@/components/Header';
import PostLanding from './PostLanding';

type Props = {};

function index({}: Props) {
  return (
    <div>
      <Header />
      <Box h='100%' overflowY={'hidden'}>
        <PostLanding />
      </Box>
    </div>
  );
}

export default index;
