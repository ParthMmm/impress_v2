import React, { ReactElement } from 'react';
import {
  Flex,
  Heading,
  Box,
  Button,
  Input,
  FormControl,
  VStack,
  Spinner,
  Center,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useLogInMutation } from '../../generates';
import client from '../../app/request-client';
import Toasts from './Toasts';
import Title from '../Title';

import { MutateProps, FormValues } from '../../interfaces';

interface Props {}

const validationSchema = z.object({
  username: z.string().min(3, { message: 'must be 3 or more characters' }),
  password: z.string().min(8, { message: 'must be 8 or more characters' }),
});

function LogIn({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading, error, data }: any = useLogInMutation(client, {
    onSuccess: (data) => {
      queryClient.setQueryData('CurrentUser', data);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const errorMsg: string = error?.response?.errors[0].message;

  const onSubmit = async (data: FormValues) => {
    if (validationSchema.parse(data)) {
      mutate(validationSchema.parse(data));
    }
    reset();
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
                <Center mt='5rem'>
                  <Spinner />
                </Center>
              </Box>
            </Box>
          </Flex>
        </form>
      </>
    );
  }

  if (data) {
    router.push('/');
    return (
      <>
        <Toasts errors='' data={{ data }} />
      </>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} title='login'>
          <Flex
            justifyContent={'center'}
            align={'center'}
            h='100vh'
            flexDir={'column'}
          >
            <Title fontSize={48} />
            <Box border='2px solid' mt='2' h='24rem' w='24rem'>
              <Box>
                <Heading m={4}>login</Heading>
                <VStack spacing={6} mt={12} mx={4}>
                  <FormControl isInvalid={errors?.username}>
                    <Input
                      label='username'
                      id='username'
                      type='username'
                      placeholder='username'
                      focusBorderColor={'white'}
                      {...register('username')}
                    />
                    <FormErrorMessage>
                      {errors?.username?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.password}>
                    <Input
                      id='password'
                      label='password'
                      type='password'
                      placeholder='password'
                      focusBorderColor={'white'}
                      {...register('password')}
                    />
                    <FormErrorMessage>
                      {errors?.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
                <Flex justifyContent={'flex-end'} mt={8} mx={4}>
                  {' '}
                  <Button type='submit'>submit</Button>
                </Flex>
              </Box>
            </Box>
            {error ? (
              <Toasts errors={error?.response?.errors[0].message} data='' />
            ) : (
              <></>
            )}
          </Flex>
        </form>
      </>
    );
  }
}

export default LogIn;
