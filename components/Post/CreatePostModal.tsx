import React, {
  ReactElement,
  ReactNode,
  useRef,
  useState,
  useEffect,
} from 'react';
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
} from '@chakra-ui/react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import {
  useGetFilmsQuery,
  useGetLubesQuery,
  useCreatePostMutation,
} from '../../generates';
import client from '../../app/request-client';
import { RiImage2Line } from 'react-icons/ri';
import { useQueryClient } from 'react-query';
import { CreatePostValues, currentUser } from '../../interfaces';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Toasts from '../Auth/Toasts';

interface Props {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

function CreatePostModal({ onOpen, onClose, isOpen }: Props): ReactElement {
  const { colorMode } = useColorMode();
  const [file, setFile] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  const lubesQuery = useGetLubesQuery(client);
  const filmsQuery = useGetFilmsQuery(client);
  const queryClient = useQueryClient();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
  });

  const currentUser: currentUser | undefined =
    queryClient.getQueryData('CurrentUser');

  const validationSchema = z.object({
    title: z.string().min(3, { message: 'must be 3 or more characters' }),
    description: z.string({
      required_error: 'required',
      invalid_type_error: ' must be a string',
    }),
    type: z.string({ required_error: 'required' }),
    film: z.string({ required_error: 'required' }),
    lube: z.string({ required_error: 'required' }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { mutate, data }: any = useCreatePostMutation(client, {
    onSuccess: (data) => {
      setPostSuccess(true);
      queryClient.invalidateQueries('getTotalPosts');
      queryClient.invalidateQueries('GetPosts.infinite');
    },
  });

  const onSubmit = async (data: CreatePostValues) => {
    const formData = new FormData();

    axios
      .post('/api/uploadImage', {
        fileName: acceptedFiles[0].name,
        fileType: acceptedFiles[0].type,
      })
      .then((res) => {
        Object.entries(res.data.post.fields).forEach(([k, v]: string | any) => {
          formData.append(k, v);
        });
        formData.append('file', acceptedFiles[0]);
        return res;
      })
      .then((res) => {
        axios
          .post(res.data.post.url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(() => {
            console.log('🎉', res.data.link);

            data['file_'] = res.data.link;
            mutate({ post: data });
            setFile('');
            reset();
          })
          .catch((errors) => console.log(errors));
      })
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setFile(acceptedFiles.map((single) => URL.createObjectURL(single))[0]);
  }, [acceptedFiles]);

  useEffect(() => {
    setFile('');
  }, [onClose]);

  useEffect(() => {
    if (postSuccess) {
      setPostSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (lubesQuery.data?.getLubes && filmsQuery.data?.getFilms && !postSuccess) {
    return (
      <Flex>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent
            border={'2px solid'}
            bg={colorMode === 'light' ? 'white' : 'black'}
            borderColor={colorMode === 'light' ? 'black' : 'white'}
          >
            <ModalHeader>create post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6}>
                  <FormControl isInvalid={errors?.title} isRequired>
                    <Input
                      {...register('title', { required: true })}
                      type='text'
                      name='title'
                      id='title'
                      placeholder='title'
                      focusBorderColor={
                        colorMode === 'light' ? 'black' : 'white'
                      }
                    ></Input>
                    <FormErrorMessage mb={-2}>
                      {errors?.title?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.description} isRequired>
                    <Textarea
                      {...register('description', { required: true })}
                      type='text'
                      name='description'
                      id='description'
                      placeholder='description'
                      focusBorderColor={
                        colorMode === 'light' ? 'black' : 'white'
                      }
                    ></Textarea>
                    <FormErrorMessage mb={-2}>
                      {errors?.title?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired>
                    <Select
                      {...register('type', { required: true })}
                      name='type'
                      id='type'
                      placeholder='switch type'
                      bg={colorMode === 'light' ? 'white' : 'black'}
                      focusBorderColor={
                        colorMode === 'light' ? 'black' : 'white'
                      }
                    >
                      <option style={{ background: 'black' }} value='clicky'>
                        clicky
                      </option>
                      <option style={{ background: 'black' }} value='linear'>
                        linear
                      </option>
                      <option style={{ background: 'black' }} value='tactile'>
                        tactile
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <Select
                      {...register('lube', { required: true })}
                      name='lube'
                      id='lube'
                      placeholder='lube'
                      bg={colorMode === 'light' ? 'white' : 'black'}
                      focusBorderColor={
                        colorMode === 'light' ? 'black' : 'white'
                      }
                    >
                      {lubesQuery?.data?.getLubes.sort().map((lube) => {
                        return (
                          <option
                            style={{ background: 'black' }}
                            key={lube?.id}
                            //@ts-ignore
                            value={lube?.name}
                          >
                            {lube?.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <Select
                      {...register('film', { required: true })}
                      name='film'
                      id='film'
                      placeholder='switch film'
                      bg={colorMode === 'light' ? 'white' : 'black'}
                      focusBorderColor={
                        colorMode === 'light' ? 'black' : 'white'
                      }
                    >
                      {filmsQuery?.data?.getFilms.sort().map((film) => {
                        return (
                          <option
                            style={{ background: 'black' }}
                            key={film?.id}
                          >
                            {film?.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Flex align='center' flexDir={'column'}>
                    <FormControl isInvalid={errors?.file_} isRequired>
                      <Box {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Flex align='center' flexDir={'column'}>
                          <Button leftIcon={<Icon as={RiImage2Line} />} mb={2}>
                            upload image
                          </Button>
                          {file ? (
                            <Image
                              src={file ? file : ''}
                              h='150'
                              w='150'
                              alt={file ? 'img' : ''}
                            />
                          ) : (
                            <></>
                          )}
                        </Flex>
                      </Box>
                      <FormErrorMessage>
                        {errors.file_ && errors?.file_.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </VStack>
                <Flex
                  justifyContent={'space-between'}
                  align='center'
                  mt={8}
                  mx={4}
                >
                  <Button onClick={onClose} size='md'>
                    cancel
                  </Button>
                  {currentUser?.currentUser?.id ? (
                    <Button
                      type='submit'
                      bg={colorMode === 'light' ? 'black' : 'white'}
                      color={colorMode === 'light' ? 'white' : 'black'}
                    >
                      submit
                    </Button>
                  ) : (
                    <Button
                      isDisabled
                      type='submit'
                      bg={colorMode === 'light' ? 'white' : 'black'}
                      color={colorMode === 'light' ? 'black' : 'white'}
                    >
                      <Tooltip label='please sign in'>submit</Tooltip>
                    </Button>
                  )}
                </Flex>
              </form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }

  if (postSuccess) {
    return (
      <Flex>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent
            border={'2px solid'}
            bg={colorMode === 'light' ? 'white' : 'black'}
            borderColor={colorMode === 'light' ? 'black' : 'white'}
          >
            <ModalHeader>created post {data?.createPost?.title} 🎉</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Button>view post</Button>
              </VStack>
              <Flex
                justifyContent={'space-between'}
                align='center'
                mt={8}
                mx={4}
              ></Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }

  return <></>;
}

export default CreatePostModal;
