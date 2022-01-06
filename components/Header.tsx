import React, { ReactElement } from 'react';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Title from './Title';
import { useQueryClient } from 'react-query';
import { RiUser4Fill, RiSettings4Line, RiLogoutBoxLine } from 'react-icons/ri';
interface Props {}

interface User {
  id: number;
  username: string;
}

function Header({}: Props): ReactElement {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const queryClient = useQueryClient();

  const user: User | undefined = queryClient.getQueryData('CurrentUser');
  console.log(user);
  if (user) {
    return (
      <Flex
        w={'full'}
        pos={'sticky'}
        bg={colorMode === 'light' ? 'white' : 'black'}
        top={0}
        zIndex={2}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          mx={'12rem'}
          w='full'
          h='12vh'
          borderBottom='5px solid '
        >
          <Title fontSize={48} />
          {/* <Menu>
            <MenuButton as={RiUser4Fill} color='white'>
              {user.username}
            </MenuButton>
            <MenuList>
              <MenuItem>profile</MenuItem>
              <MenuItem>settings</MenuItem>
              <MenuItem>log out</MenuItem>
            </MenuList>
          </Menu> */}

          <Menu variant={'outline'}>
            <MenuButton
              as={IconButton}
              icon={<RiUser4Fill />}
              // color='purple.600'
              bg='0'
              _focus={{ border: '2px solid white' }}
              _hover={{ bg: 'none', color: 'gray.200' }}
              _active={{ border: '2px solid white', bg: 'none' }}
              // as={RiUser4Fill}
              // color='white'
              size='lg'
            />
            <MenuList bg={colorMode === 'light' ? 'white' : 'black'}>
              <MenuItem icon={<RiUser4Fill />}>profile</MenuItem>
              <MenuItem icon={<RiSettings4Line />}>settings</MenuItem>
              <MenuItem icon={<RiLogoutBoxLine />}>log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex
        w={'full'}
        pos={'sticky'}
        bg={colorMode === 'light' ? 'white' : 'black'}
        top={0}
        zIndex={2}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          mx={'12rem'}
          w='full'
          h='12vh'
          borderBottom='5px solid '
        >
          <Title fontSize={48} />
          <ButtonGroup>
            <Button onClick={() => router.push('/login')}>log in</Button>
            <Button onClick={() => router.push('/register')}>
              get started
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    );
  }
}

export default Header;
