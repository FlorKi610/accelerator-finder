import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  colors: {
    brand: {
      50: '#E5F0FF',
      100: '#B8D4FF',
      200: '#8AB8FF',
      300: '#5C9CFF',
      400: '#2E80FF',
      500: '#0064FF',
      600: '#0050CC',
      700: '#003C99',
      800: '#002866',
      900: '#001433',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        fontWeight: 'medium',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'sm',
        },
        transition: 'all 0.2s',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        ghost: {
          _hover: {
            bg: 'gray.50',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          overflow: 'hidden',
          transition: 'all 0.2s',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'md',
          },
        },
      },
    },
  },
});
