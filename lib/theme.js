import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
  grassTeal: '#5EEAD4',
  brand: {
    50: '#EEF2FF',
    100: '#DDE4FF',
    200: '#B9C5FF',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#3B5BFE',
    600: '#3B5BFE',
    700: '#1E3DDB',
    800: '#134E4A',
    900: '#042F2E'
  },
  ink: {
    50: '#F7F8FB',
    100: '#ECEEF4',
    200: '#D8DBE5',
    300: '#B8BDC9',
    400: '#8F96A6',
    500: '#6B7280',
    600: '#4B5160',
    700: '#303541',
    800: '#1B1E28',
    900: '#0B0C10'
  }
}

const styles = {
  global: props => ({
    'html, body': {
      minHeight: '100%',
      scrollBehavior: 'smooth'
    },
    body: {
      bg: mode('#FAFAFC', '#0B0C10')(props),
      color: mode('ink.700', 'ink.100')(props),
      fontFamily: 'body',
      fontFeatureSettings: '"kern", "liga", "ss01", "tnum"',
      overflowX: 'hidden',
      transition: 'background-color 240ms ease, color 240ms ease',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility'
    },
    '::selection': {
      bg: mode('#3B5BFE', '#5EEAD4')(props),
      color: mode('white', 'ink.900')(props)
    },
    a: {
      textUnderlineOffset: '4px'
    },
    code: {
      fontFamily: 'mono'
    },
    '#__next': {
      minHeight: '100vh'
    },
    '*::-webkit-scrollbar': {
      width: '10px',
      height: '10px'
    },
    '*::-webkit-scrollbar-thumb': {
      background: mode('rgba(15,18,32,0.18)', 'rgba(255,255,255,0.18)')(props),
      borderRadius: '999px',
      border: `2px solid ${mode('#FAFAFC', '#0B0C10')(props)}`
    }
  })
}

const components = {
  Heading: {
    variants: {
      'page-title': props => ({
        color: mode('ink.900', 'ink.50')(props),
        fontFamily: 'heading',
        fontWeight: 600,
        letterSpacing: '-0.045em',
        lineHeight: 1.02,
        fontSize: { base: '2.8rem', md: '4.8rem' }
      }),
      'section-title': props => ({
        color: mode('ink.900', 'ink.50')(props),
        fontFamily: 'heading',
        fontSize: { base: '1.55rem', md: '2.2rem' },
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        marginTop: 0,
        marginBottom: 0,
        textDecoration: 'none'
      }),
      'section-subtitle': props => ({
        color: mode('ink.600', 'ink.300')(props),
        fontFamily: 'mono',
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '0.02em'
      })
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3B5BFE', '#5EEAD4')(props),
      textUnderlineOffset: '4px',
      transition: 'color 160ms ease, border-color 160ms ease',
      _hover: {
        color: mode('#1E3DDB', '#2DD4BF')(props)
      }
    })
  },
  Button: {
    baseStyle: {
      borderRadius: 'full',
      fontFamily: 'body',
      fontWeight: 600,
      letterSpacing: '0.01em'
    },
    variants: {
      solid: props => ({
        bg: mode('#3B5BFE', '#5EEAD4')(props),
        color: mode('white', 'ink.900')(props),
        boxShadow: mode(
          '0 14px 34px -20px rgba(15,18,32,0.7)',
          '0 16px 42px -22px rgba(94,234,212,0.55)'
        )(props),
        _hover: {
          bg: mode('#1E3DDB', '#2DD4BF')(props),
          transform: 'translateY(-1px)',
          _disabled: {
            bg: mode('#3B5BFE', '#5EEAD4')(props)
          }
        },
        _active: {
          transform: 'translateY(0)'
        }
      }),
      outline: props => ({
        borderColor: mode('blackAlpha.200', 'whiteAlpha.300')(props),
        color: mode('ink.800', 'ink.100')(props),
        bg: mode('whiteAlpha.700', 'whiteAlpha.50')(props),
        _hover: {
          borderColor: mode('#3B5BFE', '#5EEAD4')(props),
          bg: mode('brand.50', 'whiteAlpha.100')(props),
          transform: 'translateY(-1px)'
        }
      }),
      ghost: props => ({
        color: mode('ink.700', 'ink.100')(props),
        _hover: {
          bg: mode('blackAlpha.50', 'whiteAlpha.100')(props),
          color: mode('#1E3DDB', '#2DD4BF')(props)
        }
      })
    }
  },
  Badge: {
    baseStyle: props => ({
      borderRadius: 'full',
      px: 2,
      py: 0.5,
      textTransform: 'none',
      fontFamily: 'mono',
      letterSpacing: '0.02em',
      bg: mode('blackAlpha.50', 'whiteAlpha.100')(props),
      color: mode('ink.600', 'ink.200')(props),
      border: '1px solid',
      borderColor: mode('blackAlpha.100', 'whiteAlpha.200')(props)
    })
  },
  Container: {
    baseStyle: {
      maxW: '1120px'
    }
  }
}

const fonts = {
  heading: "'Space Grotesk', 'Inter', sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace"
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
