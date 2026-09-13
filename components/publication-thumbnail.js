import { Box, Image as ChakraImage, useColorModeValue } from '@chakra-ui/react'

const THUMBNAIL_SIZES = {
  home: { w: '190px', h: '142px' },
  archive: { w: '224px', h: '168px' }
}

const PublicationThumbnail = ({ publication, size = 'home' }) => {
  const mediaBg = useColorModeValue('#F4F5F8', '#12141A')
  const { w, h } = THUMBNAIL_SIZES[size]
  const src = publication.thumbnail || publication.image
  const scale = publication.thumbnailScale || 1
  const position = publication.thumbnailPosition || 'center'

  return (
    <Box
      w={w}
      h={h}
      flexShrink={0}
      bg={mediaBg}
      borderRadius="8px"
      overflow="hidden"
      p="8px"
    >
      <Box
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <ChakraImage
          src={src}
          alt={`${publication.title} overview`}
          maxW="100%"
          maxH="100%"
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
