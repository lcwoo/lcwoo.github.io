import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import { Analytics } from '@vercel/analytics/react'


const Scene = dynamic(() => import('../scene'), {
  ssr: false,
  loading: () => <div>Loading 3D scene...</div>
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Chungwoo's homepage" />
        <meta name="author" content="Lee Chung-woo" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Lee Chung-woo" />
        <meta name="og:title" content="Lee Chung-woo" />
        <meta property="og:type" content="website" />
        <title>Chungwoo - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container 
        maxW={{ base: '100%', md: '95ch' }}
        px={{ base: 3, md: 6 }}
        pt={14}
      >
        <Scene />
        <Box align="center" h="5em" />
        {children}
        <Analytics />
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
