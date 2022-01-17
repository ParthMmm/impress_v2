import React, { ReactElement } from 'react';
import { Flex, Box, Grid, GridItem, Spacer } from '@chakra-ui/react';
import Card from '../Post/Card';
import client from '../../app/request-client';
import { useGetPostsQuery } from '../../generates';
interface Props {}

function Posts({}: Props): ReactElement {
  const filmsQuery = useGetPostsQuery(client);

  console.log(filmsQuery.data?.getPosts);

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h='100%'
      flexDir={'column'}
      overflowY={'scroll'}
      zIndex={1}
      // mt='24rem'
      // p='5rem'
    >
      {filmsQuery?.data?.getPosts?.map((post) => (
        <Card key={post?.id} post={post} />
      ))}
    </Flex>
  );
}

export default Posts;
