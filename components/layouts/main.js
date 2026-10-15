import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Footer from '../footer'
import { Analytics } from '@vercel/analytics/react'

const BackgroundShell = () => {
  const accent = useColorModeValue(
    'rgba(59, 91, 254, 0.10)',
    'rgba(94, 234, 212, 0.14)'
  )
  const accentTwo = useColorModeValue(
    'rgba(59, 91, 254, 0.10)',
    'rgba(94, 234, 212, 0.14)'
  )
  const grid = useColorModeValue(
    'rgba(15,18,32,0.055)',
    'rgba(255,255,255,0.035)'
  )
  const grainOpacity = useColorModeValue(0.05, 0.1)

  return (
    <Box
      aria-hidden="true"
      position="fixed"
      inset={0}
      zIndex={-1}
      overflow="hidden"
      bg={useColorModeValue('#FAFAFC', '#0B0C10')}
      _before={{
        content: '""',
        position: 'absolute',
        top: '-200px',
        right: '-180px',
        w: '560px',
        h: '560px',
        borderRadius: 'full',
        bg: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
        filter: 'blur(40px)',
        opacity: 0.9
      }}
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '-240px',
        left: '-160px',
        w: '520px',
        h: '520px',
        borderRadius: 'full',
        bg: `radial-gradient(circle, ${accentTwo} 0%, transparent 65%)`,
        filter: 'blur(50px)',
        opacity: 0.6
      }}
    >
      <Box
        position="absolute"
        inset={0}
        opacity={useColorModeValue(0.8, 1)}
        bgImage={`linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`}
        bgSize="64px 64px"
        sx={{
          maskImage:
            'radial-gradient(ellipse at 50% 25%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 25%, black 30%, transparent 80%)'
        }}
      />
      <Box
        position="absolute"
        inset="-20%"
        opacity={grainOpacity}
        mixBlendMode="overlay"
        pointerEvents="none"
        bgImage={`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`}
      />
    </Box>
  )
}

const Main = ({ children, router }) => {
  return (
    <Box as="main" minH="100vh">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Lee Chung-woo, M.S. student in the Interdisciplinary Program in Artificial Intelligence at Seoul National University. Better spatial perception for better embodied action."
        />
        <meta name="author" content="Lee Chung-woo" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Lee Chung-woo" />
        <meta property="og:title" content="Lee Chung-woo" key="og:title" />
        <meta
          property="og:description"
          content="M.S. Student · Interdisciplinary Program in AI, Seoul National University. Better spatial perception for better embodied action."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lcwoo.github.io/" />
        <meta
          property="og:image"
          content="https://lcwoo.github.io/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Lee Chung-woo · M.S. Student, Seoul National University"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lee Chung-woo"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="M.S. Student · Interdisciplinary Program in AI, Seoul National University. Better spatial perception for better embodied action."
        />
        <meta
          name="twitter:image"
          content="https://lcwoo.github.io/og-image.png"
        />
        <title>Lee Chung-woo · Research Notebook</title>
      </Head>

      <BackgroundShell />
      <NavBar path={router.asPath} />

      <Container id="top" maxW="1040px" px="28px" pt="96px" pb="80px">
        {children}
        <Analytics />
      </Container>
      <Footer />
    </Box>
  )
}

export default Main
