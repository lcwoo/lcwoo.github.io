import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Button,
  VStack,
  Text,
  Flex,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { PubGridItem } from '../components/grid-item'
import { ChevronLeftIcon } from '@chakra-ui/icons'

const Publications = () => (
  <Layout title="Publications">
    <Container maxW="980px" px={0}>
      <Section>
        <Box
          pb={8}
          mb={8}
          borderBottom="1px solid"
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
        >
          <Badge mb={4}>/publications</Badge>
          <Heading
            as="h1"
            variant="page-title"
            fontSize={{ base: '3rem', md: '4.2rem' }}
          >
            Publications
          </Heading>
          <Text
            mt={4}
            maxW="680px"
            color={useColorModeValue('ink.600', 'ink.300')}
          >
            Research outputs and project pages collected from Lee
            Chung-woo&apos;s work.
          </Text>
        </Box>

        <VStack spacing={6} align="stretch">
          <PubGridItem
            id="espada-arxiv-2512-07371"
            title="ESPADA: Execution Speedup via Semantics Aware Demonstration Data Downsampling for Imitation Learning"
            journal="arXiv"
            project_page="https://project-espada.github.io/espada/"
            author={
              'Byungju Kim (1,2)*, Jinu Pahk (1,2)*, Chungwoo Lee (1)*, Jaejoon Kim (1,3)*, Jangha Lee {1}*'
            }
            paper="https://www.arxiv.org/pdf/2512.07371"
            video="none"
            code="none"
            slides="none"
          />
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

export default Publications
export { getStaticProps } from '../components/chakra'
