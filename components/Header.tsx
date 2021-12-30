import React, { ReactElement } from 'react';
import {
  Flex,
  Heading,
  ButtonGroup,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Title from './Title';
interface Props {}

function Header({}: Props): ReactElement {
  const router = useRouter();
  const { colorMode } = useColorMode();

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
          <Button onClick={() => router.push('/register')}>get started</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Header;
