import NextLink from 'next/link'
import { Container, Heading, Box, Divider, Button, Text, Stack, Badge } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const posts = [
  {
    title: 'Research_summary',
    href: '/posts/research-summary',
    summary: 'Summary of projects and research conducted during my undergraduate studies.',
    pinned: true
  }

  // 🔽 나중에 포스트를 추가할 때는 아래 형식으로 추가하세요.
  // {
  //   title: 'New Post Title',
  //   href: '/posts/new-post',
  //   summary: 'Short description of the post content.',
  //   pinned: false
  // },
]

const Posts = () => {
  // pinned === true 인 포스트를 위로 정렬
  const sortedPosts = [...posts].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <Layout title="Posts">
      <Container maxW="100%">
        <Heading as="h3" fontSize={20} mb={4}>Posts</Heading>
        <Divider my={6} />

        <Stack spacing={4}>
          {sortedPosts.map(p => (
            <Box key={p.href} p={4} borderWidth="1px" borderRadius="lg">
              <Heading as="h4" fontSize="lg" mb={1} display="flex" alignItems="center">
                <NextLink href={p.href}>{p.title}</NextLink>
                {p.pinned && (
                  <Badge ml={2} colorScheme="teal" fontSize="0.8em">
                    📌 Pinned
                  </Badge>
                )}
              </Heading>
              <Text opacity={0.8}>{p.summary}</Text>
              <Box mt={3}>
                <Button as={NextLink} href={p.href} colorScheme="teal" size="sm">
                  Read
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider my={6} />
        <Box my={6} align="center">
          <Button as={NextLink} href="/" colorScheme="teal">
            Return to home
          </Button>
        </Box>

        <Box align="center" h="5em" />
      </Container>
    </Layout>
  )
}

export default Posts
export { getStaticProps } from '../components/chakra'
