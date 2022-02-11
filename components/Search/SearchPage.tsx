import { GetByFilmQuery } from '@/generates';
import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  name: string | undefined;
  data: GetByFilmQuery | undefined;
};

function SearchPage({ name, data }: Props) {
  return (
    <>
      <Heading>{name}</Heading>
      <Text>results</Text>
    </>
  );
}

export default SearchPage;
