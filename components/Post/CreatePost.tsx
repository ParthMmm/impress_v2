import React, { ReactElement } from 'react';
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
  Text,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
interface Props {}

const validationSchema = z.object({
  username: z.string().min(3, { message: 'must be 3 or more characters' }),
  password: z.string().min(8, { message: 'must be 8 or more characters' }),
});

function CreatePost({}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(validationSchema),
  });
  const onSubmit = () => {};

  return (
    <Flex>
      <Button onClick={onOpen}>create post</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent border={'2px solid white'} bg='black'>
          <ModalHeader>create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6}>
                <FormControl>
                  <Input
                    {...register('title', { required: true })}
                    type='text'
                    name='title'
                    id='title'
                    placeholder='title'
                  ></Input>
                </FormControl>
                <FormControl>
                  <Textarea
                    {...register('description', { required: true })}
                    type='text'
                    name='description'
                    id='description'
                    placeholder='description'
                  ></Textarea>
                </FormControl>
                <FormControl>
                  <Select placeholder='switch type'></Select>
                </FormControl>
                <FormControl>
                  <Select placeholder='lube'></Select>
                </FormControl>
                <FormControl>
                  <Select placeholder='switch film'></Select>
                </FormControl>
              </VStack>
              <Flex justifyContent={'flex-end'} mt={8} mx={4}>
                <Button type='submit'>submit</Button>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CreatePost;
