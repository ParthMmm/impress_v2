import { extendTheme, useColorMode } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      color: mode('black', 'white')(props),
      bg: mode('white', 'black')(props),

      transitionProperty: 'background-color',
      transitionDuration: 'normal',
      // overflowY: 'scroll',
      // overscrollBehavior: 'contain',
      height: '100%',
    },
    Select: {
      color: mode('black', 'white')(props),
      bg: mode('white', 'black')(props),
      focusBorderColor: mode('white', 'black')(props),

      transitionProperty: 'background-color',
      transitionDuration: 'normal',
    },
  }),
};

const components = {
  components: (props) => ({
    MenuList: {
      // color: mode('black', 'white')(props),
      // bg: mode('white', 'black')(props),

      transitionProperty: 'background-color',
      transitionDuration: 'normal',
    },
    Select: {
      color: mode('black', 'white')(props),
      transitionProperty: 'background-color',
      transitionDuration: 'normal',

      variants: {
        pog: {
          bg: 'purple',
          color: 'red',
        },
      },
    },
    option: {
      // styles: { background: mode('white', 'black')(props) },
    },
  }),
};
const theme = extendTheme({ config, styles, components });

export default theme;
