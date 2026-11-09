import { Box, Image as ChakraImage, useColorModeValue } from '@chakra-ui/react'

const THUMBNAIL_SIZES = {
  home: { w: '190px', h: '142px' },
  featured: {
    w: { base: '208px', md: '224px' },
    h: { base: '156px', md: '168px' }
  },
  archive: { w: '224px', h: '168px' }
}

const PublicationThumbnail = ({ publication, size = 'home' }) => {
  const mediaBg = useColorModeValue('#F4F5F8', '#12141A')
  const { w, h } = THUMBNAIL_SIZES[size]
  const src =
    size === 'featured'
      ? publication.image || publication.thumbnail
      : publication.thumbnail || publication.image
  const scale = publication.thumbnailScale || 1
  const position = publication.thumbnailPosition || 'center'

  return (
    <Box
      as="a"
      href={publication.image}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View full research figure for ${publication.title}`}
      title="View full research figure"
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'brand.300',
        outlineOffset: '4px'
      }}
      w={w}
      h={size === 'featured' ? 'auto' : h}
      flexShrink={0}
      bg={mediaBg}
      borderRadius="8px"
      overflow="hidden"
      p="8px"
    >
      <Box
        w="100%"
        h={size === 'featured' ? 'auto' : '100%'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <ChakraImage
          src={src}
          alt={`${publication.title} overview`}
          loading="lazy"
          decoding="async"
          maxW="100%"
          maxH={size === 'featured' ? { base: '140px', md: '152px' } : '100%'}
          w="auto"
          h="auto"
          objectFit="contain"
          objectPosition={position}
          transform={scale !== 1 ? `scale(${scale})` : undefined}
          transformOrigin="center"
          fallback={<Box w="100%" h="100%" bg={mediaBg} />}
        />
      </Box>
    </Box>
  )
}

export default PublicationThumbnail
