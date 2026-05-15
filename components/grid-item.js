import NextLink from 'next/link'
import Image from 'next/image'
import {
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Link,
  Stack,
  Button,
  Badge,
  Heading,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text mt={2}>{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const WorkGridItem = ({
  children,
  category = 'works',
  id,
  title,
  thumbnail
}) => (
  <Box w="100%" textAlign="center">
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      scroll={false}
      cursor="pointer"
    >
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
      />
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 18px;
      }
    `}
  />
)

export const PubGridItem = ({
  children,
  title,
  thumbnail,
  journal,
  project_page,
  author,
  paper,
  video,
  code,
  slides
}) => {
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const surface = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.045)'
  )
  const muted = useColorModeValue('ink.600', 'ink.300')
  const hoverBorder = useColorModeValue('brand.500', 'brand.300')

  const actions = [
    ['Project Page', project_page],
    ['Paper', paper],
    ['Video', video],
    ['Code', code],
    ['Slides', slides]
  ].filter(([, href]) => href && href !== 'none')

  return (
    <Box
      w="100%"
      p={{ base: 5, md: 6 }}
      border="1px solid"
      borderColor={borderColor}
      borderRadius={{ base: '24px', md: '30px' }}
      bg={surface}
      textAlign="left"
      backdropFilter="blur(16px)"
      transition="transform 180ms ease, border-color 180ms ease, background 180ms ease"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: hoverBorder
      }}
    >
      {thumbnail && (
        <Box mb={5} overflow="hidden" borderRadius="22px">
          <Image
            src={thumbnail}
            alt={title}
            className="grid-item-thumbnail"
            placeholder="blur"
          />
        </Box>
      )}

      <HStack spacing={2} mb={3} flexWrap="wrap">
        {journal && <Badge>{journal}</Badge>}
        <Badge>publication</Badge>
      </HStack>

      <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} lineHeight={1.25}>
        {title}
      </Heading>

      {author && (
        <Text mt={3} color={muted} fontSize="sm" lineHeight={1.7}>
          {author}
        </Text>
      )}

      {children && (
        <Text mt={3} fontSize="sm">
          {children}
        </Text>
      )}

      <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} mt={5}>
        {actions.map(([label, href]) => (
          <Button
            key={label}
            as={Link}
            href={href}
            isExternal
            size="sm"
            variant={label === 'Paper' ? 'solid' : 'outline'}
            rightIcon={<ChevronRightIcon />}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

export const PubGridItemLink = ({ href, children }) => (
  <LinkBox>
    <LinkOverlay href={href} target="_blank">
      {children}
    </LinkOverlay>
  </LinkBox>
)
