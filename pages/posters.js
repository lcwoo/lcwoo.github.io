import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Badge,
  Link,
  Image as ChakraImage,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { getPosters } from '../data/posters'

const PosterCard = ({ poster }) => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const mediaBg = useColorModeValue('#F4F5F8', '#12141A')
  const accent = useColorModeValue('#3B5BFE', '#5EEAD4')
  const muted = useColorModeValue('ink.500', 'ink.400')
  const actions = [
    ['pdf', poster.pdf],
    ['paper', poster.links?.paper],
    ['project', poster.links?.project]
  ].filter(([, href]) => href)

  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      borderRadius="12px"
      overflow="hidden"
    >
      <Link href={poster.pdf} isExternal display="block" bg={mediaBg} p="12px">
        <ChakraImage
          src={poster.preview}
          alt={`${poster.title} poster`}
          w="100%"
          h="auto"
          borderRadius="6px"
          fallback={<Box w="100%" h="240px" bg={mediaBg} />}
        />
      </Link>
      <Box p={{ base: '12px 14px', md: '14px 18px' }}>
        <Text fontFamily="mono" fontSize="0.72rem" color={muted} mb="6px">
          {poster.venue}
        </Text>
        <Heading as="h3" fontSize="1rem" fontWeight={600} lineHeight={1.35}>
          {poster.title}
        </Heading>
        <HStack spacing={4} mt="8px" flexWrap="wrap">
          {actions.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              isExternal
              fontFamily="mono"
              fontSize="0.75rem"
              color={accent}
              letterSpacing="0.02em"
            >
              {label} ↗
            </Link>
          ))}
        </HStack>
      </Box>
    </Box>
  )
}

const Posters = () => (
  <Layout title="Posters">
    <Container maxW="980px" px={0}>
      <Section>
        <Box
          pb={8}
          mb={8}
          borderBottom="1px solid"
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
        >
          <Badge mb={4}>/posters</Badge>
          <Heading
            as="h1"
            variant="page-title"
            fontSize={{ base: '3rem', md: '4.2rem' }}
          >
            Posters
          </Heading>
          <Text
            mt={4}
            maxW="680px"
            color={useColorModeValue('ink.600', 'ink.300')}
          >
            Conference posters. Click a poster to open the full PDF.
          </Text>
        </Box>

        <VStack spacing={8} align="stretch">
          {getPosters().map(poster => (
            <PosterCard key={poster.id} poster={poster} />
          ))}
        </VStack>
      </Section>

      <Flex justify="center" mt={10}>
        <Button
          as={NextLink}
          href="/"
          variant="outline"
          leftIcon={<ChevronLeftIcon />}
        >
          Return to home
        </Button>
      </Flex>
    </Container>
  </Layout>
)

export default Posters
export { getStaticProps } from '../components/chakra'
