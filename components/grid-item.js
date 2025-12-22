import NextLink from 'next/link'
import Image from 'next/image'
import {
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Link,
  Stack,
  Button
} from '@chakra-ui/react'
import { Global } from '@emotion/react'

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
        border-radius: 12px;
      }
    `}
  />
)

export const PubGridItem = ({
  children,
  id,
  title,
  thumbnail,
  journal,
  project_page,
  author,
  paper,
  video,
  code,
  slides
}) => (
  <Box
    w="100%"
    maxW="900px"
    mx="auto"
    p={5}
    borderWidth="1px"
    borderColor="whiteAlpha.200"
    borderRadius="xl"
    bg="whiteAlpha.50"
    textAlign="left"
  >
    {thumbnail && (
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
      />
    )}
    <Text mt={2} fontSize={18} fontWeight="bold">
      {title}
    </Text>
    {journal && <Text fontSize={14} color="gray.500">{journal}</Text>}
    {author && <Text fontSize={14} color="gray.500">{author}</Text>}
    <Text fontSize={14}>{children}</Text>
    <Stack direction="row" spacing={3} mt={3}>
      {project_page && project_page !== 'none' && (
        <Button
          as={Link}
          href={project_page}
          isExternal
          size="sm"
          variant="solid"
          colorScheme="teal"
        >
          Project Page
        </Button>
      )}
      {paper && paper !== 'none' && (
        <Button
          as={Link}
          href={paper}
          isExternal
          size="sm"
          variant="solid"
          colorScheme="teal"
        >
          Paper
        </Button>
      )}
    </Stack>
  </Box>
)

export const PubGridItemLink = ({ href, children }) => (
  <LinkBox>
    <LinkOverlay href={href} target="_blank">
      {children}
    </LinkOverlay>
  </LinkBox>
)
