import React from 'react';
import { currentUser, User } from '../../interfaces';
import { useQueryClient } from 'react-query';
import { Box, Text, Flex, Heading } from '@chakra-ui/react';

type Props = {};

function UserHeading({}: Props) {
  const queryClient = useQueryClient();

  const currentUser: currentUser | undefined =
    queryClient.getQueryData('CurrentUser');

  return (
    <div>
      {currentUser?.currentUser?.id ? (
        <Box p='4'>
          <Heading as='span' mr={1}>
            hi{' '}
          </Heading>
          <Heading
            bgGradient='linear(to-r, #654ea3, #eaafc8)'
            bgClip='text'
            as='span'
          >
            {currentUser?.currentUser?.username}
          </Heading>
        </Box>
      ) : (
        <Heading p='4'>hey</Heading>
      )}
    </div>
  );
}

export default UserHeading;
