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
} from '@chakra-ui/react';
import Image from 'next/image';
interface Props {
  //   data: Post;
}

interface Post {
  title: string;
  image: string;
}

function Card({}: Props): ReactElement {
  return (
    <Box border='4px solid' mt='16'>
      <Flex
        // align={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Box mx={'6'} my={'2'}>
          <Heading>title</Heading>
          <Text>user</Text>
        </Box>

        <Button mt={2} mr={2}>
          share
        </Button>
      </Flex>
      <Box
        d='block'
        w={'28rem'}
        borderTop={'2px solid'}
        borderBottom={'2px solid'}
      >
        <Image
          src='https://i.redd.it/22sfgweo1w171.jpg'
          alt='poop'
          width={400}
          height={400}
          layout='responsive'
        />
      </Box>
      <Flex
        flexDir={'row'}
        mx='2'
        justifyContent={'space-between'}
        align={'center'}
      >
        <HStack spacing={4} color='gray.400'>
          <Tag>type</Tag>
          <Tag>lube</Tag>
          <Tag>film</Tag>
        </HStack>
        <Box>
          <ButtonGroup>
            <Button bg='none'>like</Button>
            <Button bg='none'>dislike</Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <Flex mx='2' my='2'>
        <Text>description</Text>
      </Flex>
    </Box>
  );
}

export default Card;
