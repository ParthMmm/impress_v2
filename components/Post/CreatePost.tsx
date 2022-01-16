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
import CreatePostModal from './CreatePostModal';

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
  setFileInfo: React.Dispatch<React.SetStateAction<null>>;
};

function CreatePost({}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [file, setFile] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  const lubesQuery = useGetLubesQuery(client);
  const filmsQuery = useGetFilmsQuery(client);
  const queryClient = useQueryClient();
  const [uploadState, setUploadState] = useState({});
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
  });

  useEffect(() => {
    setFile(acceptedFiles.map((single) => URL.createObjectURL(single))[0]);
  }, [acceptedFiles]);

  useEffect(() => {
    setFile('');
  }, [onClose]);

  const validationSchema = z.object({
    title: z.string().min(3, { message: 'must be 3 or more characters' }),
    description: z.string({
      required_error: 'required',
      invalid_type_error: ' must be a string',
    }),
    type: z.string({ required_error: 'required' }),
    film: z.string({ required_error: 'required' }),
    lube: z.string({ required_error: 'required' }),
    // file:
    //   typeof window === 'undefined'
    //     ? z.any()
    //     : z.instanceof(File, { message: 'img required' }),
    // file_: z.instanceof(File, { message: 'error with image' }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: zodResolver(validationSchema),
    // defaultValues: {
    //   title: '',
    //   description: '',
    //   type: '',
    //   film: '',
    //   lube: '',
    //   file_: '',
    // },
  });

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   file.forEach((xx) => URL.revokeObjectURL(xx.preview));
  // }, [file]);

  const { mutate, data }: any = useCreatePostMutation(client, {
    onSuccess: (data) => {
      console.log({ post: data });
      Toasts;
    },
  });

  const currentUser: currentUser | undefined =
    queryClient.getQueryData('CurrentUser');

  const onSubmit = async (data: CreatePostValues) => {
    const x = await axios.post('/api/uploadImage', {
      fileName: acceptedFiles[0].name,
      fileType: acceptedFiles[0].type,
    });
    const formData = new FormData();

    console.log(x.data);

    Object.entries(x.data.post.fields).forEach(([k, v]: string | any) => {
      formData.append(k, v);
    });
    formData.append('file', acceptedFiles[0]); // The file has be the last element

    axios
      .post(x.data.post.url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        console.log('🎉', x.data.link);
        console.log(data);

        data['file_'] = x.data.link;
        mutate({ post: data });
        setFile('');
        reset();
      })
      .catch((errors) => console.log(errors));
  };
  let img = queryClient.getQueryData('image');

  if (lubesQuery.data?.getLubes && filmsQuery.data?.getFilms) {
    return (
      <Flex>
        <Button onClick={onOpen}>create post</Button>

        <CreatePostModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
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
