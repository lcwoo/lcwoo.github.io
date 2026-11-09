import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Text,
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
        <Text fontSize="xs" fontFamily="mono" color={labelColor}>
          {label}
        </Text>
        <Text fontSize="xs" fontFamily="mono" color={muted}>
          {format(value)}
        </Text>
      </Box>
      {children}
    </Box>
  )
}

const SplatControls = ({ params, onChange }) => {
  const trackBg = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.12)'
  )

  const set = (key, value) => onChange({ ...params, [key]: value })

  return (
    <Box w="100%" minW={0} onPointerDown={e => e.stopPropagation()}>
      <Box
        display="grid"
        gridTemplateColumns="minmax(0, 1fr) auto"
        gap={6}
        alignItems="center"
      >
        <ParamRow
          label="Opacity"
          value={params.opacity}
          format={v => v.toFixed(2)}
        >
          <Slider
            aria-label="Scene opacity"
            minH="32px"
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
            <SliderThumb
              boxSize="16px"
              _before={{ content: '""', position: 'absolute', inset: '-14px' }}
            />
          </Slider>
        </ParamRow>

        <Box
          as="label"
          htmlFor="gs-point-cloud-toggle"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          minH="44px"
          cursor="pointer"
        >
          <Text fontSize="xs" fontFamily="mono">
            Point cloud
          </Text>
          <Switch
            id="gs-point-cloud-toggle"
            size="sm"
            colorScheme="teal"
            isChecked={params.pointCloud}
            onChange={e => set('pointCloud', e.target.checked)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SplatControls
