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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { gql, useMutation } from '@apollo/client';

// import { Magic } from 'magic-sdk';
// const m = new Magic(`${process.env.NEXT_PUBLIC_API_KEY}`);

interface Props {}

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
});

const LOG_IN = gql`
  mutation Mutation($username: String, $password: String) {
    logIn(username: $username, password: $password) {
      username
    }
  }
`;

function LogIn({}: Props): ReactElement {
  const [logIn, { data, loading, error }] = useMutation(LOG_IN);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log({ data }, { loading }, { error });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    logIn({ variables: { username: data.username, password: data.password } });
    // await m.auth.loginWithMagicLink({ email: data.username });
  };

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

export default LogIn;
