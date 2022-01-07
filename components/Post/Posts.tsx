import React, { ReactElement } from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Card from '../Post/Card';

interface Props {}

function Posts({}: Props): ReactElement {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h='100%'
      flexDir={'column'}
      overflowY={'scroll'}
      zIndex={1}
      // mt='24rem'
      // p='5rem'
    >
      <Card />
      <Card />
      <Card />
      <Card />
    </Flex>
  );
}

export default Posts;
