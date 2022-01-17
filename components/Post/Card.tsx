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
  post: Post | undefined | null;
  // post: Post;
}

interface Post {
  __typename?: 'DataPost';
  id?: string | null | undefined;
  title?: string | null | undefined;
  description?: string | null | undefined;
  file_?: string | null | undefined;
  createdAt?: any | null | undefined;
  tags?:
    | Array<
        | {
            __typename?: 'Tag';
            type?: string | null | undefined;
            lube?: string | null | undefined;
            film?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  author?:
    | {
        __typename?: 'User';
        username?: string | null | undefined;
        id?: string | null | undefined;
      }
    | null
    | undefined;
}

function Card({ post }: Props): ReactElement {
  return (
    <Box border='4px solid'>
      <Flex
        // align={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Box mx={'6'} my={'2'}>
          <Heading>{post?.title}</Heading>
          <Text>{post?.author?.username}</Text>
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
          src={post?.file_ as string}
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
        <Text>{post?.description}</Text>
      </Flex>
    </Box>
  );
}

export default Card;
