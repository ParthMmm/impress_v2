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
  Spinner,
} from '@chakra-ui/react';
import Card from '../Post/Card';
import client from '../../app/request-client';
import {
  useInfiniteGetPostsQuery,
  useGetPostsQuery,
  useGetTotalPostsQuery,
} from '../../generates';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
interface Props {
  totalPosts: number;
}

function Posts({ totalPosts }: Props): ReactElement {
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
    isLoading,
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

  const totalQuery = useGetTotalPostsQuery(client);
  console.log(totalQuery.data?.getTotalPosts);

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

  const paginationComponent =
    totalPosts > 5 ? (
      <Flex
        flexDir={'row'}
        justifyContent={'space-between'}
        align={'center'}
        mt={'4'}
        mb={'12'}
      >
        <HStack spacing={'12rem'}>
          {' '}
          {pageParam > 0 ? (
            <Button onClick={() => prevPage()} leftIcon={<RiArrowLeftSFill />}>
              prev page
            </Button>
          ) : (
            <Button visibility={'hidden'}></Button>
          )}
          {pageParam + 5 > totalPosts ? (
            <Button visibility={'hidden'}></Button>
          ) : (
            <Button
              onClick={() => nextPage()}
              rightIcon={<RiArrowRightSFill />}
            >
              next page
            </Button>
          )}
        </HStack>
      </Flex>
    ) : null;

  if (isLoading) {
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
      <Spinner />
    </Flex>;
  }
  if (data) {
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
        {paginationComponent}
      </Flex>
    );
  } else {
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
        <Text>something went wrong</Text>
      </Flex>
    );
  }
}

export default Posts;
