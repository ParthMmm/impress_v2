import React from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import PostPage from '@/components/Post/PostPage';
import Header from '@/components/Header';
import SearchLanding from './SearchLanding';
type Props = {};

function index({}: Props) {
  return (
    <div>
      <Header />
      <Box h='100%' overflowY={'hidden'}>
        <SearchLanding />
      </Box>
    </div>
  );
}

export default index;
