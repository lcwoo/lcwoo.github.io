import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  const modeKey = useColorModeValue('light', 'dark')

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={modeKey}
        initial={{ y: -8, opacity: 0, rotate: -12 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 8, opacity: 0, rotate: 12 }}
        transition={{ duration: 0.18 }}
      >
        <IconButton
          aria-label="Toggle theme"
          size="sm"
          variant="outline"
          borderRadius="full"
          borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
          bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')}
          color={useColorModeValue('ink.700', 'brand.200')}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          _hover={{
            bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
            transform: 'translateY(-1px)'
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
