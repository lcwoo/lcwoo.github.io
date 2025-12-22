import NextLink from 'next/link'
import { Container, Heading, Box, Button, VStack } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { PubGridItem } from '../components/grid-item'

const Publications = () => (
  <Layout title="Publications">
    <Container maxW="container.lg">
      <Heading as="h3" fontSize={20} mb={4}>
        Publications
      </Heading>
      
      <VStack spacing={6} align="stretch">
        <Section>
          <PubGridItem
            id="espada-arxiv-2512-07371"
            title="ESPADA: Execution Speedup via Semantics Aware Demonstration Data Downsampling for Imitation Learning"
            journal="arXiv"
            project_page="https://project-espada.github.io/espada/"
            author={"Byungju Kim (1,2)*, Jinu Pahk (1,2)*, Chungwoo Lee (1)*, Jaejoon Kim (1,3)*, Jangha Lee {1}*"}
            paper="https://www.arxiv.org/pdf/2512.07371"
            video="none"
            code="none"
            slides="none"
          >
          </PubGridItem>
        </Section>

      </VStack>
      <Box my={6} align="center">
        <Button as={NextLink} href="/" colorScheme="teal">
          Return to home
        </Button>
      </Box>

      <Box align="center" h="5em" />
    </Container>
  </Layout>
)

export default Publications
export { getStaticProps } from '../components/chakra'
