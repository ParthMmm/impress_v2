import React from 'react';
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  Textarea,
  useColorMode,
  InputGroup,
  Icon,
  Image,
  Box,
  Tooltip,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { RiImage2Line, RiAddFill } from 'react-icons/ri';
import CreatePostModal from '../Post/CreatePostModal';

type Props = {};

function CreatePostNav({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Flex px='4' pb='1'>
      <Button
        onClick={onOpen}
        as={IconButton}
        icon={<RiAddFill size={'32'} />}
        bg='0'
        border={'2px solid'}
        borderColor={colorMode === 'light' ? 'white' : 'black'}
        _hover={{ border: '2px solid ', bg: '0' }}
        rounded={'0'}
      />

      <CreatePostModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default CreatePostNav;
