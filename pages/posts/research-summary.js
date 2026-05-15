import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  Flex,
  Badge,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import Layout from '../../components/layouts/article'

const ResearchSummary = () => {
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const surface = useColorModeValue(
    'rgba(255,255,255,0.68)',
    'rgba(255,255,255,0.045)'
  )
  const muted = useColorModeValue('ink.600', 'ink.300')

  return (
    <Layout title="Research_summary">
      <Container maxW="1080px" px={0}>
        <Box pb={8} mb={8} borderBottom="1px solid" borderColor={borderColor}>
          <Badge mb={4}>/posts/research-summary</Badge>
          <Heading
            as="h1"
            variant="page-title"
            fontSize={{ base: '2.8rem', md: '4.2rem' }}
          >
            Research_summary
          </Heading>
          <Text mt={4} maxW="680px" color={muted}>
            Summary of projects and research conducted during my undergraduate
            studies.
          </Text>
        </Box>

        <Box
          border="1px solid"
          borderColor={borderColor}
          borderRadius={{ base: '22px', md: '30px' }}
          bg={surface}
          overflow="hidden"
          boxShadow={useColorModeValue(
            '0 26px 60px -46px rgba(15,18,32,0.42)',
            '0 28px 75px -44px rgba(0,0,0,0.72)'
          )}
        >
          <Flex
            align="center"
            justify="space-between"
            gap={3}
            px={{ base: 4, md: 5 }}
            py={3}
            borderBottom="1px solid"
            borderColor={borderColor}
            fontFamily="mono"
            fontSize="xs"
            color={muted}
          >
            <Text>/public/research_summary.pdf</Text>
            <Link href="/research_summary.pdf" isExternal>
              open pdf
            </Link>
          </Flex>
          <Box w="100%" h={{ base: '72vh', md: '82vh' }}>
            <iframe
              src="/research_summary.pdf"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Research Summary PDF"
            />
          </Box>
        </Box>

        <Flex justify="center" mt={8}>
          <Button
            as={NextLink}
            href="/posts"
            variant="outline"
            leftIcon={<ChevronLeftIcon />}
          >
            Back to posts
          </Button>
        </Flex>
      </Container>
    </Layout>
  )
}

export default ResearchSummary
export { getStaticProps } from '../../components/chakra'
