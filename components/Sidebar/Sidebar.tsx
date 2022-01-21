import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import CreatePost from '../Post/CreatePost';
import { currentUser, User } from '../../interfaces';
import { useQueryClient } from 'react-query';
import UserHeading from './UserHeading';
import Search from './Search';

interface Props {}

function Sidebar({}: Props): ReactElement {
  const queryClient = useQueryClient();

  const currentUser: currentUser | undefined =
    queryClient.getQueryData('CurrentUser');

  return (
    <Flex h='20%' zIndex={0} mt='48'>
      <Flex width={'350px'} position={'fixed'}>
        <Flex
          border='2px solid'
          mt='2'
          h='20rem'
          w='24rem'
          justifyContent={'flex-start'}
          flexDir={'column'}
        >
          <UserHeading />
          <Flex alignItems={'center'} justifyContent={'flex-start'}>
            {currentUser?.currentUser?.id ? <CreatePost /> : <></>}
          </Flex>
          <Search />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
