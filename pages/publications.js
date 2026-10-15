import { useState } from 'react'
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
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import AuthorNames from '../components/author-names'
import PublicationThumbnail from '../components/publication-thumbnail'
import { getPublications } from '../data/publications'

const FILTERS = [
  { key: 'all', label: 'all' },
  { key: 'journal', label: 'journal' },
  { key: 'conference', label: 'conference' },
  { key: 'workshop', label: 'workshop' }
]

// Site pages (e.g. /posters/#id) open in place; files and external URLs open in a new tab.
const isSitePage = href =>
  href.startsWith('/') && !/\.[a-z0-9]+$/i.test(href.split('#')[0])

const VenueTag = ({ venue }) => {
  const accent = useColorModeValue('#3B5BFE', '#5EEAD4')
  const muted = useColorModeValue('ink.500', 'ink.400')
  const line = useColorModeValue(
    'rgba(15,18,30,0.16)',
    'rgba(255,255,255,0.14)'
  )
  const soft = useColorModeValue(
    'rgba(59,91,254,0.08)',
    'rgba(94,234,212,0.10)'
  )
  const label = venue.archiveLabel || venue.homeLabel

  return (
    <Box
      as={venue.href ? Link : 'span'}
      href={venue.href}
      isExternal={venue.href ? true : undefined}
      display="inline-flex"
      alignItems="center"
      px="8px"
      py="2px"
      borderRadius="4px"
      border="1px solid"
      borderColor={venue.primary ? accent : line}
      bg={venue.primary ? soft : 'transparent'}
      color={venue.primary ? accent : muted}
      fontFamily="mono"
      fontSize="0.68rem"
      letterSpacing="0.04em"
      _hover={venue.href ? { textDecoration: 'none', opacity: 0.8 } : undefined}
    >
      {label}
    </Box>
  )
}

const ArchiveCard = ({ publication }) => {
  const { title, authors, venues, links = {} } = publication
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const hoverBorder = useColorModeValue('#3B5BFE', '#5EEAD4')
  const hoverBg = useColorModeValue(
    'rgba(15,18,30,0.02)',
    'rgba(255,255,255,0.025)'
  )
  const accent = useColorModeValue('#3B5BFE', '#5EEAD4')
  const actions = [
    ['paper', links.paper],
    ['project', links.project],
    ['code', links.code],
    ['poster', links.poster]
  ].filter(([, href]) => href)

  return (
    <Box
      p={{ base: '14px', md: '18px' }}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="14px"
      transition="border-color 200ms ease, background 200ms ease"
      _hover={{ borderColor: hoverBorder, bg: hoverBg }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="start"
        gap={{ base: '12px', md: '20px' }}
      >
        <PublicationThumbnail publication={publication} size="archive" />
        <Box minW={0} flex={1}>
          <HStack spacing="6px" mb="8px" flexWrap="wrap">
            {venues.map(venue => (
              <VenueTag
                key={venue.archiveLabel || venue.homeLabel}
                venue={venue}
              />
            ))}
          </HStack>
          <Heading
            as="h2"
            fontSize={{ base: '1.05rem', md: '1.15rem' }}
            fontWeight={600}
            lineHeight={1.35}
          >
            {title}
          </Heading>
          <Box mt="6px">
            <AuthorNames
              authors={authors}
              fontSize="0.84rem"
              lineHeight={1.6}
            />
          </Box>
          {actions.length > 0 && (
            <HStack spacing={4} mt="10px" flexWrap="wrap">
              {actions.map(([label, href]) => {
                const internal = isSitePage(href)
                return (
                  <Link
                    key={label}
                    href={href}
                    as={internal ? NextLink : undefined}
                    isExternal={!internal}
                    fontFamily="mono"
                    fontSize="0.76rem"
                    color={accent}
                    letterSpacing="0.02em"
                  >
                    {label} {internal ? '→' : '↗'}
                  </Link>
                )
              })}
            </HStack>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

const Publications = () => {
  const [filter, setFilter] = useState('all')
  const all = getPublications()
  const counts = all.reduce(
    (acc, p) => ({ ...acc, [p.type]: (acc[p.type] || 0) + 1 }),
    {}
  )
  const shown = all.filter(p => filter === 'all' || p.type === filter)
  const years = [...new Set(shown.map(p => p.year))].sort((a, b) => b - a)

  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const muted = useColorModeValue('ink.600', 'ink.300')
  const faint = useColorModeValue('ink.400', 'ink.500')
  const accent = useColorModeValue('#3B5BFE', '#5EEAD4')
  const chipLine = useColorModeValue(
    'rgba(15,18,30,0.14)',
    'rgba(255,255,255,0.14)'
  )
  const chipActiveBg = useColorModeValue(
    'rgba(59,91,254,0.10)',
    'rgba(94,234,212,0.12)'
  )

  return (
    <Layout title="Publications">
      <Container maxW="980px" px={0}>
        <Section>
          <Box pb={8} mb={8} borderBottom="1px solid" borderColor={borderColor}>
            <Badge mb={4}>/publications</Badge>
            <Heading
              as="h1"
              variant="page-title"
              fontSize={{ base: '3rem', md: '4.2rem' }}
            >
              Publications
            </Heading>
            <Text mt={4} maxW="680px" color={muted}>
              Papers on robot learning, vision-language-action models, and
              embodied AI.
            </Text>
            <HStack
              mt={6}
              spacing={6}
              flexWrap="wrap"
              fontFamily="mono"
              fontSize="0.78rem"
              color={faint}
            >
              <Text>
                <Text as="span" color={accent} fontWeight={600}>
                  {all.length}
                </Text>{' '}
                papers
              </Text>
              {['journal', 'conference', 'workshop'].map(t => (
                <Text key={t}>
                  <Text as="span" color={accent} fontWeight={600}>
                    {counts[t] || 0}
                  </Text>{' '}
                  {t}
                </Text>
              ))}
            </HStack>
          </Box>

          <HStack
            spacing={2}
            mb={8}
            flexWrap="wrap"
            role="group"
            aria-label="Filter by type"
          >
            {FILTERS.map(f => {
              const active = filter === f.key
              return (
                <Box
                  as="button"
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  px="12px"
                  py="5px"
                  borderRadius="full"
                  border="1px solid"
                  borderColor={active ? accent : chipLine}
                  bg={active ? chipActiveBg : 'transparent'}
                  color={active ? accent : muted}
                  fontFamily="mono"
                  fontSize="0.74rem"
                  letterSpacing="0.04em"
                  transition="all 160ms ease"
                  _hover={{ borderColor: accent }}
                >
                  {f.label}
                </Box>
              )
            })}
          </HStack>

          <VStack spacing={10} align="stretch">
            {years.map(year => (
              <Box key={year}>
                <Flex align="center" gap={4} mb={4}>
                  <Text
                    fontFamily="mono"
                    fontSize="0.9rem"
                    color={accent}
                    letterSpacing="0.08em"
                  >
                    {year}
                  </Text>
                  <Box flex={1} h="1px" bg={borderColor} />
                </Flex>
                <VStack spacing={3} align="stretch">
                  {shown
                    .filter(p => p.year === year)
                    .map(publication => (
                      <ArchiveCard
                        key={publication.id}
                        publication={publication}
                      />
                    ))}
                </VStack>
              </Box>
            ))}
          </VStack>

          <Text mt={8} fontFamily="mono" fontSize="0.72rem" color={faint}>
            * equal contribution · † corresponding author
          </Text>
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
}

export default Publications
export { getStaticProps } from '../components/chakra'
