import { extendTheme } from '@chakra-ui/react';
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
    },
  }),
};

const components = {
  components: (props) => ({
    MenuList: {
      color: mode('black', 'white')(props),
      bg: mode('white', 'black')(props),

      transitionProperty: 'background-color',
      transitionDuration: 'normal',
    },
  }),
};
const theme = extendTheme({ config, styles });

export default theme;
