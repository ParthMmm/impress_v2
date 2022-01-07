import React, { ReactElement } from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Posts from './Post/Posts';
import Sidebar from './Sidebar';
interface Props {}

function Landing({}: Props): ReactElement {
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
        <Posts />

        <Sidebar />
      </Flex>
    </>
  );
}

export default Landing;
