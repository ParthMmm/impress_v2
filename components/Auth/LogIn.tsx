import React, { ReactElement } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Tag,
  Button,
  ButtonGroup,
  HStack,
  Input,
  FormControl,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Title from '../Title';

interface Props {}

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
});

function LogIn({}: Props): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <Flex
        justifyContent={'center'}
        align={'center'}
        h='100vh'
        flexDir={'column'}
      >
        <Title fontSize={48} />
        <Box border='2px solid' mt='2' h='20rem' w='24rem'>
          <Box>
            <Heading m={4}>login</Heading>
            <VStack spacing={4} mt={12} mx={4}>
              <FormControl isInvalid={errors.username}>
                <Input
                  id='username'
                  type='username'
                  placeholder='username'
                  focusBorderColor={'white'}
                />
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <Input
                  id='password'
                  type='password'
                  placeholder='password'
                  focusBorderColor={'white'}
                />
              </FormControl>
            </VStack>
            <Flex justifyContent={'flex-end'} mt={8} mx={4}>
              {' '}
              <Button>submit</Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default LogIn;
