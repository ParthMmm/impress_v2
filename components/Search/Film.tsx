import React, { useState } from 'react';
import { HStack, Tag, Button, Link, Text } from '@chakra-ui/react';
import { useGetByFilmQuery } from '@/generates';
import client from '@/app/request-client';
import { useRouter } from 'next/router';

type Props = {
  name: string;
};

function Film({ name }: Props) {
  const router = useRouter();

  const { data } = useGetByFilmQuery(client, { film: 'Deskeys' });

  const search = () => {
    router.push({
      pathname: `/search/${name}`,
      query: { query: 'film' },
    });
  };

  return (
    <Tag
      onClick={() => search()}
      _hover={{ transform: 'scale(1.1)' }}
      transition={'transform ease-in-out 0.2s'}
    >
      <Link textDecoration='none' _hover={{ color: 'purple.500' }}>
        <Text fontSize={'sm'}>{name}</Text>
      </Link>
    </Tag>
  );
}

export default Film;
