import { Box } from '@chakra-ui/react';
import Header from '@/components/Header';
import PostLanding from './PostLanding';
import BottomNav from '@/components/BottomNav/BottomNav';

type Props = {};

function index({}: Props) {
  return (
    <div>
      <Header />
      <Box h='100%' overflowY={'hidden'}>
        <PostLanding />
      </Box>
      <Box visibility={{ base: 'visible', md: 'visible', lg: 'hidden' }}>
        <BottomNav />
      </Box>
    </div>
  );
}

export default index;
