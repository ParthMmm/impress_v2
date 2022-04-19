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

      transitionProperty: 'background-color',
      transitionDuration: 'normal',
    },
    option: {
      bg: mode('red', 'green')(props),
    },
    Textarea: {
      focusBorderColor: mode('red', 'green')(props),
    },
  }),
};

const components = {
  components: (props) => ({
    // MenuList: {
    //   // color: mode('black', 'white')(props),
    //   // bg: mode('white', 'black')(props),

    //   transitionProperty: 'background-color',
    //   transitionDuration: 'normal',
    // },
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
    Textarea: {
      focusBorderColor: mode('red', 'green')(props),
    },
    Tag: {
      baseStyle: {
        bg: 'red',
      },
    },
    // option: {
    //   style: { background: mode('white', 'black')(props) },
    // },
  }),
};

const Tag = {
  baseStyle: {
    background: 'red',
    color: 'red',
  },
  variants: {
    base: {
      bg: 'purple.200',
      color: 'red.200',
    },
  },
  defaultProps: {
    variant: 'base',
  },
};

const Button = {
  baseStyle: {
    background: 'red',
  },
  variants: {
    base: {
      bg: 'purple.500',
    },
  },
  defaultProps: {
    variant: 'base',
  },
};

const theme = extendTheme({
  config,
  styles,
  components: {
    Tag,
    Button,
  },
});
export default theme;
