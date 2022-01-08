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
  Text,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  Textarea,
  useColorMode,
  InputGroup,
  InputLeftElement,
  Icon,
  Image,
} from '@chakra-ui/react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { useGetFilmsQuery, useGetLubesQuery } from '../../generates';
import client from '../../app/request-client';
import { RiImage2Line } from 'react-icons/ri';
import { QueryClient, useQueryClient } from 'react-query';
import { CreatePostValues } from '../../interfaces';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

interface Props {}

// const validationSchema = z.object({
//   title: z.string().max(50, { message: 'must be 50 or less characters' }),
//   description: z
//     .string()
//     .max(280, { message: 'must be 280 or less characters' }),

//   type: z.string({
//     required_error: 'please select an option',
//   }),
//   film: z.string({
//     required_error: 'please select an option',
//   }),
//   switch: z.string({
//     required_error: 'please select an option',
//   }),
//   file_: z
//     .instanceof(FileList)
//     .refine((val) => val.length > 0, { message: 'please add an image' }),
// });

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  setFile: React.Dispatch<React.SetStateAction<string>>;
};

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children, setFile } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  //   console.log(inputRef.current);

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        // ={(e) => fileHandler(e)}
        onChange={(e) => setFile(URL.createObjectURL(e?.target?.files[0]))}
      />
      <>{children}</>
    </InputGroup>
  );
};

function CreatePost({}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [file, setFile] = useState('');
  const lubesQuery = useGetLubesQuery(client);
  const filmsQuery = useGetFilmsQuery(client);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    // resolver: zodResolver(validationSchema),
    // defaultValues: {
    //   title: '',
    //   description: '',
    //   film: '',
    //   lube: '',
    //   file_: FileList | '',
    // },
  });
  const onSubmit = (data: CreatePostValues) => {
    console.log(data);
  };
  let img = queryClient.getQueryData('image');
  useEffect(() => {
    console.log('i changed');
    console.log(file);
  }, [file]);
  console.log(file);

  if (lubesQuery.data?.getLubes && filmsQuery.data?.getFilms) {
    return (
      <Flex>
        <Button onClick={onOpen}>create post</Button>

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
                  <FormControl isInvalid={errors?.title} isRequired>
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
                    <FormControl isInvalid={errors.file_} isRequired>
                      <FileUpload
                        accept={'image/*'}
                        multiple
                        register={register('file_', {
                          validate: validateFiles,
                        })}
                        setFile={setFile}
                      >
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
                      </FileUpload>
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

                  <Button
                    type='submit'
                    bg={colorMode === 'light' ? 'black' : 'white'}
                    color={colorMode === 'light' ? 'white' : 'black'}
                  >
                    submit
                  </Button>
                </Flex>
              </form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }
  return <></>;
}

const validateFiles = (value: FileList) => {
  if (value.length < 1) {
    return 'Files is required';
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 10;
    if (fsMb > MAX_FILE_SIZE) {
      return 'Max file size 10mb';
    }
  }
  return true;
};

export default CreatePost;
