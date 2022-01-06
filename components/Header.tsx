import React, { ReactElement } from 'react';
import { Flex, ButtonGroup, Button, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Title from './Title';
import { useQueryClient } from 'react-query';
interface Props {}

interface User {
  id: number;
  username: string;
}

function Header({}: Props): ReactElement {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const queryClient = useQueryClient();

  const user: User | undefined = queryClient.getQueryData('auth');
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
          <ButtonGroup>
            <Button>{user.username}</Button>
          </ButtonGroup>
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
