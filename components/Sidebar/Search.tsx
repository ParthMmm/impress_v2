import React from 'react';
import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from '@chakra-ui/react';
import { RiSearch2Fill } from 'react-icons/ri';
type Props = {};

function Search({}: Props) {
  const { colorMode } = useColorMode();

  return (
    <Box px='4'>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          // eslint-disable-next-line react/no-children-prop
          children={
            <RiSearch2Fill color={colorMode === 'light' ? 'black' : 'white'} />
          }
        />
        <Input
          type='search'
          placeholder='search'
          focusBorderColor={colorMode === 'light' ? 'black' : 'white'}
          borderColor={colorMode === 'light' ? 'white' : 'black'}
          border={'2px solid'}
          _hover={{ border: '2px solid' }}
          rounded={'0'}
          //   variant='flushed'
        />
      </InputGroup>
    </Box>
  );
}

export default Search;
