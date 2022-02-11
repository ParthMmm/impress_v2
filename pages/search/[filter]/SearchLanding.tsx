import React from 'react';
import PostPage from '@/components/Post/PostPage';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Flex, Box, Grid, GridItem, Spacer, Spinner } from '@chakra-ui/react';
import SearchPage from '@/components/Search/SearchPage';
import { useRouter } from 'next/router';
import { useGetByFilmQuery } from '@/generates';
import client from '@/app/request-client';
type Props = {};

function SearchLanding({}: Props) {
  const router = useRouter();
  const filter: string | undefined = router.query.filter?.toString();
  const { data, isLoading } = useGetByFilmQuery(client, {
    film: filter,
    //@ts-ignore
    enabled: !!filter,
  });

  console.log(filter, data, { isLoading });

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
      >
        <Box width={{ base: '0px', md: '0rem', lg: '0rem', xl: '21.875rem' }} />
        <SearchPage name={filter} data={data} isLoading={isLoading} />

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
