import {
  Box,
  Text,
  Flex,
  Heading,
  Tag,
  chakra,
  Button,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import CreatePost from '../Post/CreatePost';
import { currentUser, User } from '../../interfaces';
import { useQueryClient } from 'react-query';
import UserHeading from './UserHeading';
import Search from './Search';
import SearchTags from './SearchTags';

interface Props {}

function Sidebar({}: Props): ReactElement {
  const queryClient = useQueryClient();

  const currentUser: currentUser | undefined =
    queryClient.getQueryData('CurrentUser');

  return (
    <Flex
      h='20%'
      zIndex={0}
      mt='1rem'
      width={{
        base: '0px',
        sm: '0px',
        md: '0rem',
        lg: '15rem',
        xl: '21.875rem',
      }}
    >
      <Flex position={'fixed'}>
        <Flex
          border='4px solid'
          mt='3rem'
          h={{ base: '0', md: '0rem', lg: '24rem' }}
          w={{ base: '0', md: '0rem', lg: '20rem' }}
          justifyContent={'flex-start'}
          flexDir={'column'}
        >
          <UserHeading />
          <Flex alignItems={'center'} justifyContent={'flex-start'}>
            {currentUser?.currentUser?.id ? <CreatePost /> : <></>}
          </Flex>
          <Search />
          <SearchTags />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
