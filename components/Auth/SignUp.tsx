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
import { useSession, signIn, signOut } from 'next-auth/react';
import { gql, useMutation } from '@apollo/client';
import Title from '../Title';

interface Props {}

interface FormValues {
  username: string;
  password: string;
}

const SIGN_UP = gql`
  mutation Mutation($username: String, $password: String) {
    signUp(username: $username, password: $password) {
      username
    }
  }
`;

function SignUp({}: Props): ReactElement {
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

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
    signUp({ variables: { username: data.username, password: data.password } });
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
              <Heading m={4}>sign up</Heading>
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

export default SignUp;
