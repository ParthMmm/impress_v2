import React, { useState } from 'react';
import { HStack, Tag, Button, Link, Text } from '@chakra-ui/react';
import { useGetByFilmQuery } from '@/generates';
import client from '../../app/request-client';
import { useRouter } from 'next/router';

type Props = {
  name: string;
};

function Film({ name }: Props) {
  const router = useRouter();

  const { data } = useGetByFilmQuery(client, { film: 'Deskeys' });

  console.log(typeof data);

  const search = () => {
    router.push(`/search/${name}`);
  };

  return (
    <Tag
      onClick={() => search()}
      _hover={{ transform: 'scale(1.1)' }}
      transition={'transform ease-in-out 0.2s'}
      // padding='0px'
    >
      <Link textDecoration='none' _hover={{ color: 'purple.500' }}>
        <Text fontSize={'sm'}>{name}</Text>
      </Link>
    </Tag>
  );
}

export default Film;
