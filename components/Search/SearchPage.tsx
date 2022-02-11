import { GetByFilmQuery } from '@/generates';
import { Heading, Text, Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import Card from '../Post/Card';

type Props = {
  name: string | undefined;
  data: GetByFilmQuery | undefined;
  isLoading: boolean;
};

function SearchPage({ name, data, isLoading }: Props) {
  console.log(data);

  if (data?.getByFilm && !isLoading) {
    <>
      <Heading>{name}</Heading>
      <Text>results</Text>
      {data?.getByFilm.map((post, i) => {
        return (
          <React.Fragment key={i}>
            <Card key={post?.id} post={post} />
          </React.Fragment>
        );
      })}
    </>;
  }
  if (isLoading && !data) {
    return (
      <Box border='4px solid' mt={4} mb={4}>
        <Flex justifyContent={'space-between'} flexDirection={'row'}>
          <Spinner />
        </Flex>
      </Box>
    );
  } else {
    return <>hi</>;
  }
}

export default SearchPage;
