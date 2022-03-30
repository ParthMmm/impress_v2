import { HStack, Box, Text, VStack, Divider } from '@chakra-ui/react';
import Film from '../Search/Film';
import Lube from '../Search/Lube';
import Type from '../Search/Type';

type Props = {};

function SearchTags({}: Props) {
  return (
    <Box px='4'>
      <Text fontSize={'xl'} fontWeight='600'>
        type
      </Text>
      <HStack
        spacing={2}
        color='gray.400'
        borderLeft='2px solid '
        _hover={{ borderColor: 'purple.500' }}
        transition={'border-color ease-in-out 0.2s'}
        mb={2}
      >
        <Type name={'linear'} />
        <Divider orientation='vertical' />
        <Type name={'clicky'} />
        <Divider orientation='vertical' />
        <Type name={'tactile'} />
      </HStack>

      <Text fontSize={'xl'} fontWeight='600'>
        film
      </Text>
      <HStack
        spacing={2}
        color='gray.400'
        borderLeft='2px solid '
        borderColor={'none'}
        _hover={{ borderColor: 'purple.500' }}
        transition={'border-color ease-in-out 0.2s'}
        mb={2}
      >
        <Film name={'NK_'} />
        <Film name={'TX'} />
        <Film name={'Deskeys'} />
      </HStack>
      <Text fontSize={'xl'} fontWeight='600'>
        lube
      </Text>
      <HStack
        spacing={2}
        color='gray.400'
        borderLeft='2px solid '
        borderColor={'none'}
        _hover={{ borderColor: 'purple.500' }}
        transition={'border-color ease-in-out 0.2s'}
        mb={2}
      >
        <Lube name={'Krytox'} />
        <Lube name={'G-Lube'} />
        <Lube name={'Dialetric'} />
      </HStack>
    </Box>
  );
}

export default SearchTags;
