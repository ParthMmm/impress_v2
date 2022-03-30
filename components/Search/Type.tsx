import { HStack, Tag, Button, Link, Text } from '@chakra-ui/react';
import client from '@/app/request-client';
import { useGetByLubeQuery, useGetByTypeQuery } from '@/generates';
import { useRouter } from 'next/router';

type Props = {
  name: string;
};

function Type({ name }: Props) {
  const router = useRouter();

  const { data } = useGetByTypeQuery(client, { type: name });
  // console.log(data);
  const search = () => {
    router.push({
      pathname: `/search/${name}`,
      query: { query: 'type' },
    });
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

export default Type;
