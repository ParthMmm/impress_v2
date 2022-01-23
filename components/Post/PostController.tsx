import { useGetPostsQuery, useGetSinglePostQuery } from '@/generates';
import { useRouter } from 'next/router';
import React from 'react';
import Card from './Card';
import client from '../../app/request-client';
import { Spinner } from '@chakra-ui/react';
type Props = {};

function PostController({}: Props) {
  const router = useRouter();
  const id: string | undefined = router.query.postID?.toString();

  const { data, isLoading } = useGetSinglePostQuery(client, {
    getSinglePostId: id,
    //@ts-ignore
    enabled: !!id,
  });

  console.log(data);

  if (data) {
    return (
      <>
        <Card post={data?.getSinglePost} />
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return <></>;
}

export default PostController;
