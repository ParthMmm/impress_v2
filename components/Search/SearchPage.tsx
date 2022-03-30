import { GetByFilmQuery } from '@/generates';
import { Heading, Text, Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import Card from '../Post/Card';
import { Post } from '@/interfaces';

type Props = {
  name: string | undefined;
  data: [Post];
};

function SearchPage({ name, data }: Props) {
  if (data) {
    return (
      <Box>
        <Heading>{name}</Heading>
        <Text>results</Text>
        {data.map((post, i: React.Key | null | undefined) => {
          return (
            <React.Fragment key={i}>
              <Card key={post?.id} post={post} />
            </React.Fragment>
          );
        })}
      </Box>
    );
  }
  if (!data) {
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
