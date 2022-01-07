import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import CreatePost from './Post/CreatePost';

interface Props {}

function Sidebar({}: Props): ReactElement {
  return (
    <Flex h='100%'>
      <Flex width={'350px'} position={'fixed'}>
        <Flex
          border='2px solid'
          mt='2'
          h='20rem'
          w='24rem'
          justifyContent={'flex-start'}
          flexDir={'column'}
        >
          <Heading>sidebar</Heading>
          <Flex alignItems={'center'} justifyContent={'center'}>
            <CreatePost />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
