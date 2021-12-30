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
interface Props {}

function SignUp({}: Props): ReactElement {
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
      <Flex justifyContent={'center'} align={'center'} h='100vh'>
        <Box border='2px solid' h='20rem' w='24rem'>
          <Box>
            <Heading m={4}>register</Heading>
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

export default SignUp;
