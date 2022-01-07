import React, { ReactElement } from 'react';
import {
  Flex,
  Heading,
  Box,
  Button,
  Center,
  Input,
  FormControl,
  VStack,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Title from '../Title';
import { useRouter } from 'next/router';
import { UseMutateFunction, useQueryClient } from 'react-query';
import { useSignUpMutation } from '../../generates';
import client from '../../app/request-client';
import Toasts from './Toasts';
import { MutateProps, FormValues } from '../../interfaces';
interface Props {}

const validationSchema = z.object({
  username: z.string().min(3, { message: 'must be atleast 3 characters' }),
  password: z.string().min(8, { message: 'must be atleast 8 characters' }),
});

function SignUp({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading, error, data }: MutateProps = useSignUpMutation(
    client,
    {
      onSuccess: (data) => {
        queryClient.setQueryData('CurrentUser', data.signUp);
      },
    }
  );
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
                <Heading m={4}>sign up</Heading>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            justifyContent={'center'}
            align={'center'}
            h='100vh'
            flexDir={'column'}
          >
            <Title fontSize={48} />
            <Box border='2px solid' mt='2' h='24rem' w='24rem'>
              <Box>
                <Heading m={4}>sign up</Heading>
                <VStack spacing={4} mt={12} mx={4}>
                  <FormControl isInvalid={errors?.username}>
                    <Input
                      id='username'
                      type='username'
                      placeholder='username'
                      focusBorderColor={'white'}
                      {...register('username')}
                    />
                    <FormErrorMessage mb={-2}>
                      {errors?.username?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors?.password}>
                    <Input
                      id='password'
                      type='password'
                      placeholder='password'
                      focusBorderColor={'white'}
                      {...register('password')}
                    />
                    <FormErrorMessage mb={-2}>
                      {errors?.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
                <Flex justifyContent={'flex-end'} mt={10} mx={4}>
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

export default SignUp;
