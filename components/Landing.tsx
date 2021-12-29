import React, { useState, useEffect, ReactElement } from 'react';
import { Flex, Text, Heading, Box, Center } from '@chakra-ui/react';

interface Props {}

function Landing({}: Props): ReactElement {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} h='100%'>
      <Heading>Impress</Heading>
    </Flex>
  );
}

export default Landing;
