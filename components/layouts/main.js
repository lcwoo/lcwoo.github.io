import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Footer from '../footer'
import { Analytics } from '@vercel/analytics/react'

const BackgroundShell = () => {
  const fineGrid = useColorModeValue(
    'rgba(15,18,32,0.024)',
    'rgba(255,255,255,0.014)'
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
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.6}
        bgImage={`linear-gradient(${fineGrid} 1px, transparent 1px), linear-gradient(90deg, ${fineGrid} 1px, transparent 1px)`}
        bgSize="64px 64px"
        sx={{
          maskImage:
            'linear-gradient(90deg, black 0%, transparent 22%, transparent 78%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, black 0%, transparent 22%, transparent 78%, black 100%)'
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
          content="Chungwoo Lee, M.S. student in the Interdisciplinary Program in Artificial Intelligence at Seoul National University, working on 3D-grounded robot learning for VLA and visuomotor policies."
        />
        <meta name="author" content="Chungwoo Lee" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Chungwoo Lee" />
        <meta property="og:title" content="Chungwoo Lee" key="og:title" />
        <meta
          property="og:description"
          content="M.S. Student · Interdisciplinary Program in AI, Seoul National University. 3D-grounded robot learning for VLA and visuomotor policies."
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
          content="Chungwoo Lee · M.S. Student, Seoul National University"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chungwoo Lee"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="M.S. Student · Interdisciplinary Program in AI, Seoul National University. 3D-grounded robot learning for VLA and visuomotor policies."
        />
        <meta
          name="twitter:image"
          content="https://lcwoo.github.io/og-image.png"
        />
        <title>Chungwoo Lee · Research Notebook</title>
      </Head>

      <BackgroundShell />
      <NavBar path={router.asPath} />

      <Container
        id="top"
        maxW="1168px"
        px={{ base: 6, md: 6 }}
        pt="80px"
        pb="64px"
      >
        {children}
        <Analytics />
      </Container>
      <Footer />
    </Box>
  )
}

export default Main
