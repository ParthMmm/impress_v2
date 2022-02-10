import React from 'react';
import {
  Flex,
  ButtonGroup,
  Button,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { currentUser, User } from '../../interfaces';
import CreatePostNav from './CreatePostNav';
import SearchNav from './SearchNav';

type Props = {};

function BottomNav({}: Props) {
  const { colorMode } = useColorMode();
  const queryClient = useQueryClient();

  const currentUser: currentUser | undefined =
    queryClient.getQueryData('CurrentUser');

  return (
    <Flex
      w='full'
      pos='sticky'
      bottom={0}
      zIndex={2}
      h='5rem'
      bg={colorMode === 'light' ? 'white' : 'black'}
      justifyContent={'space-evenly'}
      align={'center'}
    >
      {/* <Box> */}
      {currentUser?.currentUser?.id ? <CreatePostNav /> : <></>}

      <SearchNav />
    </Flex>
  );
}

export default BottomNav;
