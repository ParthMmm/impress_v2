import React, { useState, useEffect, ReactElement } from 'react';
import { Flex, Text, Heading, Box, Center, Button } from '@chakra-ui/react';
import Card from './Post/Card';
import { useQuery, gql } from '@apollo/client';

interface Props {}

function Landing({}: Props): ReactElement {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h='80%'
      // mt='8'
      flexDir={'column'}
      overflowY={'scroll'}
      zIndex={1}
    >
      {/* <Heading>Impress</Heading> */}
      <Card />
      <Card />
    </Flex>
  );
}

export default Landing;
