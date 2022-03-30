import {
  HStack,
  Tag,
  Button,
  Link,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import client from '@/app/request-client';
import { useGetByLubeQuery } from '@/generates';
import { useRouter } from 'next/router';

type Props = {
  name: string;
};

function Lube({ name }: Props) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const { data } = useGetByLubeQuery(client, { lube: name });
  // console.log(data);
  const search = () => {
    router.push({
      pathname: `/search/${name}`,
      query: { query: 'lube' },
    });
  };
  return (
    <Tooltip
      label='lube'
      aria-label='A tooltip'
      bg={colorMode === 'light' ? 'black' : 'white'}
      openDelay={2000}
    >
      <Tag
        onClick={() => search()}
        _hover={{ transform: 'scale(1.1)' }}
        transition={'transform ease-in-out 0.2s'}
        // padding='0px'
      >
        <Link
          textDecoration='none'
          _hover={{ color: 'purple.500' }}
          color={colorMode === 'light' ? 'black' : 'white'}
        >
          <Text fontSize={'sm'}>{name}</Text>
        </Link>
      </Tag>
    </Tooltip>
  );
}

export default Lube;
