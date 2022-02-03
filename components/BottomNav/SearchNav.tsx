import React from 'react';
import {
  Box,
  Text,
  IconButton,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  HStack,
  Tag,
  Heading,
} from '@chakra-ui/react';
import { RiSearch2Fill } from 'react-icons/ri';
type Props = {};

function SearchNav({}: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Flex px='4' pb='1'>
        <Button
          as={IconButton}
          icon={<RiSearch2Fill size={'32'} />}
          bg='0'
          border={'2px solid'}
          borderColor={colorMode === 'light' ? 'white' : 'black'}
          _hover={{ border: '2px solid ', bg: '0' }}
          rounded={'0'}
          //@ts-ignore
          ref={btnRef}
          onClick={onOpen}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        //@ts-ignore
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg='black'>
          <DrawerCloseButton />
          <DrawerHeader>search</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' mb='2' />
            <Heading>- type</Heading>
            <HStack spacing={4} color='gray.400' mt='2' mb='10'>
              <Tag>clicky</Tag>
              <Tag>krytox</Tag>
              <Tag>films</Tag>
            </HStack>
            <Heading>- lube</Heading>
            <HStack spacing={4} color='gray.400' mt='2' mb='10'>
              <Tag>clicky</Tag>
              <Tag>krytox</Tag>
              <Tag>films</Tag>
            </HStack>
            <Heading>- film</Heading>
            <HStack spacing={4} color='gray.400' mt='2'>
              <Tag>clicky</Tag>
              <Tag>krytox</Tag>
              <Tag>films</Tag>
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              cancel
            </Button>
            <Button bg='white' color='black'>
              submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SearchNav;
