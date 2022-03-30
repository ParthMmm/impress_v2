import { HStack, Box } from '@chakra-ui/react';
import Film from '../Search/Film';
import Lube from '../Search/Lube';
import Type from '../Search/Type';

type Props = {};

function SearchTags({}: Props) {
  return (
    <Box px='4'>
      <HStack spacing={2} color='gray.400'>
        <Type name={'linear'} />
        <Lube name={'G-Lube'} />
        <Film name={'Deskeys'} />
      </HStack>
    </Box>
  );
}

export default SearchTags;
