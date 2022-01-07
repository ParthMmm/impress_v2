import React, { ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';
import Card from './Post/Card';

interface Props {}

function Landing({}: Props): ReactElement {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h='80%'
      flexDir={'column'}
      overflowY={'scroll'}
      zIndex={1}
    >
      <Card />
      <Card />
    </Flex>
  );
}

export default Landing;
