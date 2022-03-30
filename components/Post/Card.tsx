import React, { ReactElement, useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Tag,
  Button,
  ButtonGroup,
  HStack,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import Film from '../Search/Film';
import Type from '../Search/Type';
import Lube from '../Search/Lube';
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
  film?:
    | { __typename?: 'Tag'; name?: string | null | undefined }
    | null
    | undefined;
  lube?:
    | { __typename?: 'Tag'; name?: string | null | undefined }
    | null
    | undefined;
  type?:
    | { __typename?: 'Tag'; name?: string | null | undefined }
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
  const [path, setPath] = useState('');
  const [copied, setCopied] = useState(false);

  const toast = useToast();
  const { asPath } = useRouter();

  // const tags = post?.tags?.map((a) => {
  //   return { film: a?.film, lube: a?.lube, type: a?.type };
  // });

  useEffect(() => {
    setPath(`${process.env.NEXT_PUBLIC_FRONTEND_SERVER}` + `post/${post?.id}`);
  }, [post?.id]);

  let tags: string[] = [];
  if (post?.film?.name && post?.type?.name && post?.lube?.name)
    tags = [post?.type?.name, post?.lube.name, post?.film.name];

  const tagComponent = tags ? (
    <HStack spacing={4} color='gray.400'>
      <Type name={tags[0]} />
      <Lube name={tags[1]} />
      <Film name={tags[2]} />
    </HStack>
  ) : null;

  return (
    <Box border='4px solid' mt={4} mb={4}>
      <Flex
        // align={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Box mx={'6'} my={'2'}>
          <Heading>{post?.title}</Heading>
          <Text>{post?.author?.username}</Text>
        </Box>
        <CopyToClipboard text={path} onCopy={() => setCopied(true)}>
          <Button
            mt={2}
            mr={2}
            onClick={() =>
              toast({
                title: 'Copied to Clipboard',
                status: 'success',
                duration: 2000,
                isClosable: true,
                variant: 'top-accent',
              })
            }
          >
            share
          </Button>
        </CopyToClipboard>
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
        {tagComponent}
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
