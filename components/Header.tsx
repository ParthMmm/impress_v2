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
interface Props {}

function Header({}: Props): ReactElement {
  return (
    <Flex w={'full'}>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        // maxW='1250px'
        mx={'24'}
        // mx='0 auto'
        w='full'
        px={5}
        h='12vh'
        borderBottom='5px solid '
      >
        <Heading
          _hover={{ color: 'blue.400' }}
          transition={'color ease-in-out 0.2s'}
        >
          impress
        </Heading>
        <ButtonGroup>
          <Button>log in</Button>
          <Button>get started</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Header;
