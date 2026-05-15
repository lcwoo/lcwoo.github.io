import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'

export const SPLAT_SCALE = 0.7

export const DEFAULT_SPLAT_PARAMS = {
  opacity: 1,
  pointCloud: false
}

export function applySplatParams(viewer, params) {
  if (!viewer?.splatMesh) return

  try {
    const scene = viewer.getSplatScene(0)
    if (scene) scene.opacity = params.opacity
    viewer.splatMesh.setSplatScale(SPLAT_SCALE)
    viewer.splatMesh.setPointCloudModeEnabled(params.pointCloud)
    viewer.forceRenderNextFrame?.()
  } catch (error) {
    console.warn('Failed to apply splat params:', error)
  }
}

const ParamRow = ({ label, value, format, children }) => {
  const muted = useColorModeValue('ink.500', 'ink.400')
  const labelColor = useColorModeValue('ink.700', 'ink.200')

  return (
    <Box w="100%">
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Text fontSize="0.68rem" fontFamily="mono" color={labelColor} letterSpacing="0.06em">
          {label}
        </Text>
        <Text fontSize="0.68rem" fontFamily="mono" color={muted}>
          {format(value)}
        </Text>
      </Box>
      {children}
    </Box>
  )
}

const SplatControls = ({ params, onChange }) => {
  const panelBg = useColorModeValue('rgba(250,250,252,0.88)', 'rgba(11,12,16,0.82)')
  const panelBorder = useColorModeValue(
    'rgba(15,18,30,0.12)',
    'rgba(255,255,255,0.10)'
  )
  const trackBg = useColorModeValue('rgba(15,18,30,0.10)', 'rgba(255,255,255,0.12)')

  const set = (key, value) => onChange({ ...params, [key]: value })

  return (
    <Box
      position="absolute"
      top="12px"
      right="12px"
      zIndex={5}
      w={{ base: 'min(220px, calc(100% - 24px))', md: '200px' }}
      px="12px"
      py="10px"
      bg={panelBg}
      border="1px solid"
      borderColor={panelBorder}
      borderRadius="12px"
      backdropFilter="blur(10px)"
      pointerEvents="auto"
      onPointerDown={e => e.stopPropagation()}
    >
      <VStack spacing={3} align="stretch">
        <ParamRow label="alpha" value={params.opacity} format={v => v.toFixed(2)}>
          <Slider
            aria-label="Scene opacity"
            min={0.05}
            max={1}
            step={0.01}
            value={params.opacity}
            onChange={v => set('opacity', v)}
            focusThumbOnChange={false}
          >
            <SliderTrack bg={trackBg} h="4px" borderRadius="full">
              <SliderFilledTrack bg="brand.400" />
            </SliderTrack>
            <SliderThumb boxSize="12px" />
          </Slider>
        </ParamRow>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontSize="0.68rem" fontFamily="mono" letterSpacing="0.06em">
            point cloud
          </Text>
          <Switch
            size="sm"
            colorScheme="teal"
            isChecked={params.pointCloud}
            onChange={e => set('pointCloud', e.target.checked)}
          />
        </Box>
      </VStack>
    </Box>
  )
}

export default SplatControls
