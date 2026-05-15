import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  Stack,
  Badge,
  Flex,
  LinkBox,
  LinkOverlay,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'

const posts = [
  {
    title: 'Research_summary',
    href: '/posts/research-summary',
    summary:
      'Summary of projects and research conducted during my undergraduate studies.',
    pinned: true
  }

  // Add future posts in this format.
  // {
  //   title: 'New Post Title',
  //   href: '/posts/new-post',
  //   summary: 'Short description of the post content.',
  //   pinned: false
  // },
]

const Posts = () => {
  const sortedPosts = [...posts].sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
  )
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const surface = useColorModeValue(
    'rgba(255,255,255,0.68)',
    'rgba(255,255,255,0.045)'
  )
  const muted = useColorModeValue('ink.600', 'ink.300')
  const hoverBorder = useColorModeValue('brand.500', 'brand.300')

  return (
    <Layout title="Posts">
      <Container maxW="900px" px={0}>
        <Box pb={8} mb={8} borderBottom="1px solid" borderColor={borderColor}>
          <Badge mb={4}>/posts</Badge>
          <Heading
            as="h1"
            variant="page-title"
            fontSize={{ base: '3rem', md: '4.2rem' }}
          >
            Posts
          </Heading>
          <Text mt={4} maxW="650px" color={muted}>
            Notes, project summaries, and research records.
          </Text>
        </Box>

        <Stack spacing={4}>
          {sortedPosts.map((p, index) => (
            <LinkBox
              key={p.href}
              p={{ base: 5, md: 6 }}
              border="1px solid"
              borderColor={borderColor}
              borderRadius={{ base: '22px', md: '28px' }}
              bg={surface}
              transition="transform 180ms ease, border-color 180ms ease"
              _hover={{
                transform: 'translateX(4px)',
                borderColor: hoverBorder
              }}
            >
              <Flex
                align={{ base: 'flex-start', md: 'center' }}
                justify="space-between"
                gap={4}
                direction={{ base: 'column', md: 'row' }}
              >
                <Box>
                  <HStack spacing={2} mb={3}>
                    <Text fontFamily="mono" fontSize="xs" color={muted}>
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                    {p.pinned && <Badge>pinned</Badge>}
                  </HStack>
                  <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }}>
                    <LinkOverlay as={NextLink} href={p.href}>
                      {p.title}
                    </LinkOverlay>
                  </Heading>
                  <Text mt={2} color={muted}>
                    {p.summary}
                  </Text>
                </Box>
                <Button
                  as={NextLink}
                  href={p.href}
                  size="sm"
                  rightIcon={<ChevronRightIcon />}
                  flexShrink={0}
                >
                  Read
                </Button>
              </Flex>
            </LinkBox>
          ))}
        </Stack>

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
}

export default Posts
export { getStaticProps } from '../components/chakra'
