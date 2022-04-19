import React from 'react';
import PostPage from '@/components/Post/PostPage';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Flex, Box, Grid, GridItem, Spacer, Spinner } from '@chakra-ui/react';
import SearchPage from '@/components/Search/SearchPage';
import { useRouter } from 'next/router';
import { useGetByFilmQuery } from 'generates';
import client from '@/app/request-client';
import { useQueryClient } from 'react-query';
import { Post } from 'interfaces';

type Props = {};
type queryObject = {
  [k: string]: [string, object];
};

function SearchLanding({}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  let queryKey: [string, object] = ['', {}];

  const filter: string | undefined = router.query.filter?.toString();
  const query: string | undefined = router.query.query?.toString();

  console.log({ filter }, { query });

  const queryObject: queryObject = {
    type: ['getByType', { type: filter }],
    film: ['getByFilm', { film: filter }],
    lube: ['getByLube', { lube: filter }],
  };

  if (query) {
    queryKey = queryObject[query];
  }

  let data: any = queryClient.getQueryData(queryKey);
  if (data) {
    data = data[queryKey[0]];
  }
  const loadingComponent = (
    <Box border='4px solid' mt={4} mb={4}>
      <Flex justifyContent={'space-between'} flexDirection={'row'}>
        <Spinner />
      </Flex>
    </Box>
  );

  const dataComponent = (
    <>
      <Flex
        h={'100%'}
        w={{ base: '100%', md: '100%', lg: '95%' }}
        margin-left={'auto'}
        margin-right={'auto'}
        justifyContent={{
          base: 'center',
          sm: 'space-evenly',
          md: 'space-evenly',
        }}
        zIndex={0}
        overflowY={'hidden'}
        mt='32'
      >
        <Box width={{ base: '0px', md: '0rem', lg: '0rem', xl: '21.875rem' }} />
        <SearchPage name={filter} data={data} />

        <Box visibility={{ base: 'hidden', md: 'hidden', lg: 'visible' }}>
          <Sidebar />
        </Box>
      </Flex>
    </>
  );

  const mainComponent = data ? dataComponent : loadingComponent;

  return <>{mainComponent}</>;
}

export default SearchLanding;
