import React, { ReactElement } from 'react';
import Title from '../Title';
import {
  Flex,
  Heading,
  Box,
  Button,
  Input,
  FormControl,
  VStack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup/';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useMutationMutation } from '../../generates';
import client from '../../app/request-client';

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
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading, error, data } = useMutationMutation(client, {
    onSuccess: (data) => {
      console.log({ data });
      queryClient.setQueryData('currentUser', data.logIn);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    mutate({ username: data.username, password: data.password });
  };

  if (isLoading) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Spinner />
              </Box>
            </Box>
          </Flex>
        </form>
      </>
    );
  }

  if (error) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Text>error</Text>
              </Box>
            </Box>
          </Flex>
        </form>
      </>
    );
  }

  if (data) {
    // store.dispatch(authSlice.actions.setUser(data));
    console.log({ data });
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Text>success</Text>
                <Button onClick={() => router.push('/')}>go home</Button>
              </Box>
            </Box>
          </Flex>
        </form>
      </>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register('username')}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors.password}>
                    <Input
                      id='password'
                      type='password'
                      placeholder='password'
                      focusBorderColor={'white'}
                      {...register('password')}
                    />
                  </FormControl>
                </VStack>
                <Flex justifyContent={'flex-end'} mt={8} mx={4}>
                  {' '}
                  <Button type='submit'>submit</Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </form>
      </>
    );
  }
}

export default LogIn;
