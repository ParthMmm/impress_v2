import React, { ReactElement, useState, useRef, useEffect } from 'react';
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Spacer,
  Text,
  Button,
  VStack,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import Card from '../Post/Card';
import client from '../../app/request-client';
import { useInfiniteGetPostsQuery, useGetPostsQuery } from '../../generates';
import { XRay } from 'aws-sdk';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
interface Props {}

function Posts({}: Props): ReactElement {
  const [queryParams] = useState({ limit: 4 });
  const [pageParam, setPageParam] = useState(0);
  const { colorMode } = useColorMode();

  // let range = 0;
  // let pageParam: number = 0;
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
  } = useInfiniteGetPostsQuery(
    'range',
    client,
    { range: pageParam },
    {
      getNextPageParam: (lastPage, allPages) => {
        // console.log({ lastPage }, { allPages });
        return {
          range: pageParam + 5,
        };
      },
    }
  );

  // console.log(data?.pageParams);

  // const xx = useGetPostsQuery(
  //   client,
  //   { range: pageParam },
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  // console.log(xx.isFetching, xx.isPreviousData);

  // xx.data?.getPosts?.map((x) => console.log(x?.title));

  // {
  //   data?.pages.map((post) => {
  //     {
  //       post.getPosts?.map((x) => console.log(x?.title));
  //     }
  //   });
  // }

  // console.log(
  //   { status },
  //   { isFetching },
  //   { isFetchingNextPage },
  //   { isFetchingPreviousPage }
  // );

  // console.log(range);

  const listInnerRef = useRef(null);

  const executeScroll = () => {
    setTimeout(() => {
      topRef.current &&
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, 250);
  };

  const prevPage = () => {
    if (pageParam != 0) {
      setPageParam((pageParam) => pageParam - 5);
      executeScroll();
    }
  };

  const nextPage = () => {
    setPageParam((pageParam) => pageParam + 5);
    executeScroll();
  };

  const topRef = useRef<HTMLDivElement>(null);

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h='100%'
      flexDir={'column'}
      overflowY={'scroll'}
      zIndex={1}
      mt='7rem'
      // p='5rem'
      ref={topRef}
    >
      {data?.pages.map((post, i) => {
        return (
          <React.Fragment key={i}>
            {post.getPosts?.map((x) => (
              <Card key={x?.id} post={x} />
            ))}
          </React.Fragment>
        );
      })}

      <Flex
        flexDir={'row'}
        justifyContent={'space-between'}
        align={'center'}
        mt={'4'}
        mb={'12'}
      >
        <HStack spacing={'12rem'}>
          {' '}
          <Button onClick={() => prevPage()} leftIcon={<RiArrowLeftSFill />}>
            prev page
          </Button>
          <Button onClick={() => nextPage()} rightIcon={<RiArrowRightSFill />}>
            next page
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Posts;

// (alias) useGetPostsQuery<GetPostsQuery, unknown>(client: GraphQLClient, variables?: Exact<{
//   range?: InputMaybe<number> | undefined;
// }> | undefined, options?: UseQueryOptions<GetPostsQuery, unknown, GetPostsQuery, QueryKey> | undefined, headers?: HeadersInit | undefined): UseQueryResult<...>
// import useGetPostsQuery

// (alias) useInfiniteGetPostsQuery<GetPostsQuery, unknown>(pageParamKey: "range", client: GraphQLClient, variables?: Exact<{
//   range?: InputMaybe<number> | undefined;
// }> | undefined, options?: UseInfiniteQueryOptions<...> | undefined, headers?: HeadersInit | undefined): UseInfiniteQueryResult<...>
// import useInfiniteGetPostsQuery
