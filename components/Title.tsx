import React, { ReactElement } from 'react';
import { Flex, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

interface Props {
  fontSize: number;
}

function Title({ fontSize }: Props): ReactElement {
  const router = useRouter();

  return (
    <>
      <Link
        href='/'
        textDecoration={'none'}
        bgGradient='linear(to-r, #4776E6,#8E54E9)'
        bgClip={'text'}
      >
        <Heading
          transition={'color ease-in-out 0.2s'}
          // bgGradient='linear(to-l, #0F2027,#203A43,#2C5364)'
          // bgGradient='linear(to-l, #bdc3c7,#2c3e50)'
          // bgGradient='linear(to-r, #bdc3c7,#2C5364)'
          // bgClip={'text'}
          as='span'
          fontSize={fontSize}
        >
          im
        </Heading>
        <Heading
          as='span'
          // _hover={{ color: '#bdc3c7' }}
          transition={'color ease-in-out 0.2s'}
          fontSize={fontSize}
        >
          press
        </Heading>
      </Link>
    </>
  );
}

export default Title;
