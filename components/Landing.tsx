import React, { useState, useEffect, ReactElement } from 'react';
import { Flex, Text, Heading, Box, Center } from '@chakra-ui/react';
import Card from './Post/Card';

interface Props {}

function Landing({}: Props): ReactElement {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} h='50%' mt='10'>
      {/* <Heading>Impress</Heading> */}
      <Card />
    </Flex>
  );
}

export default Landing;
