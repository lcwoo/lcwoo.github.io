import { Container, Heading, Box, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import Layout from '../../components/layouts/article'

const ResearchSummary = () => (
  <Layout title="Research_summary">
    <Container maxW="100%">
      <Heading as="h3" fontSize={20} mb={4}>Research_summary</Heading>

      <div style={{ width: '100%', height: '80vh' }}>
        <iframe
          src="/research_summary.pdf"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Research Summary PDF"
        />
      </div>

      {/* bottom actions */}
      <Box align="center" mt={4}>
        <Button as={NextLink} href="/" colorScheme="teal" variant="outline" size="sm">
          Return to Home
        </Button>
      </Box>
    </Container>
  </Layout>
)

export default ResearchSummary
export { getStaticProps } from '../../components/chakra'
