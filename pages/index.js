import { useState } from 'react'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  Collapse,
  Text,
  Image as ChakraImage,
  VStack,
  HStack,
  Stack,
  SimpleGrid,
  Badge,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import {
  IoMailUnread,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLocationSharp,
  IoFlask,
  IoDocumentText
} from 'react-icons/io5'
import Script from 'next/script'

const Scene = dynamic(() => import('../components/scene'), {
  ssr: false,
  loading: () => (
    <Box
      minH={{ base: '280px', md: '360px' }}
      display="grid"
      placeItems="center"
    >
      <Text fontFamily="mono" fontSize="xs" opacity={0.6}>
        Loading 3D scene...
      </Text>
    </Box>
  )
})

const news = [
  {
    date: '2026',
    tag: 'accepted',
    text: 'ESPADA was accepted to IEEE Robotics and Automation Letters (RA-L).'
  },
  {
    date: '2026',
    tag: 'milestone',
    text: 'Admitted to the M.S. program, Interdisciplinary Program in Artificial Intelligence, Seoul National University.'
  }
]

const oldNews = [
  {
    date: '2025.06',
    tag: 'research',
    text: 'Started as a Research Assistant at Seoul National University AI Institute in June 2025.'
  },
  {
    date: '2025.06',
    tag: 'intern',
    text: 'Currently working as a Research Intern at Tomorrow Robotics since June 2025.'
  },
  {
    date: '2025.02',
    tag: 'degree',
    text: 'Graduated in February 2025 with a B.S. in Automotive Engineering from Hanyang University.'
  }
]

const education = [
  {
    date: '2019',
    school: 'Boin High School',
    degree: 'High School',
    note: 'Completed secondary education.'
  },
  {
    date: '2025',
    school: 'Hanyang University',
    degree: 'B.S., Dept. of Automotive Engineering',
    note: 'Bachelor of Science in Automotive Engineering.'
  }
]

const experience = [
  {
    period: '2026.03 – Present',
    role: 'M.S. Student',
    org: 'Interdisciplinary Program in Artificial Intelligence at Seoul National University',
    url: 'https://gsai.snu.ac.kr/',
    notes: [
      'Researching Vision-Language-Action and Vision-and-Language Navigation.',
      'Developing spatial perception capabilities for intelligent agents.'
    ]
  },
  {
    period: '2025.06 – 2026.02',
    role: 'Research Intern',
    org: 'Interdisciplinary Program in Artificial Intelligence at Seoul National University',
    url: 'https://gsai.snu.ac.kr/',
    notes: [
      'Worked as a research intern at Seoul National University AI Institute.'
    ]
  },
  {
    period: '2025.06 – 2026.01',
    role: 'Research Intern',
    org: 'Tomorrow Robotics',
    url: 'https://tommoro.ai/',
    notes: ['Worked on robotics research and development as a research intern.']
  },
  {
    period: '2023.08 – 2024.10',
    role: 'Undergraduate Researcher',
    org: 'Intelligent Robotics & Computer Vision Lab',
    notes: ['Conducted undergraduate research in robotics and computer vision.']
  },
  {
    period: '2020.07 – 2022.01',
    role: 'Sergeant',
    org: 'ROK Army Logistics Command',
    notes: ['Optical/Guard Equipment Maintenance.']
  }
]

const interests = [
  'Vision-Language-Action',
  'Vision-and-Language Navigation',
  'Robotics'
]

const contactLinks = [
  {
    label: 'canwooj@gmail.com',
    shortLabel: 'email',
    href: 'mailto:canwooj@gmail.com',
    icon: IoMailUnread,
    external: false
  },
  {
    label: 'github.com/lcwoo',
    shortLabel: 'github',
    href: 'https://github.com/lcwoo',
    icon: IoLogoGithub,
    external: true
  },
  {
    label: 'linkedin.com/in/chungwoo-lee',
    shortLabel: 'linkedin',
    href: 'https://www.linkedin.com/in/chungwoo-lee',
    icon: IoLogoLinkedin,
    external: true
  }
]

const Kbd = ({ children }) => (
  <Box
    as="span"
    display="inline-flex"
    alignItems="center"
    px="7px"
    py="2px"
    border="1px solid"
    borderColor={useColorModeValue(
      'rgba(15,18,30,0.10)',
      'rgba(255,255,255,0.08)'
    )}
    borderRadius="4px"
    bg={useColorModeValue('rgba(15,18,30,0.035)', 'rgba(255,255,255,0.035)')}
    color={useColorModeValue('ink.500', 'ink.400')}
    fontFamily="mono"
    fontSize="0.68rem"
    letterSpacing="0.08em"
    textTransform="uppercase"
  >
    {children}
  </Box>
)

const StatusDot = ({ pulse = false }) => {
  const dotColor = useColorModeValue('brand.600', 'brand.300')
  const pulseShadow = useColorModeValue(
    '0 0 0 6px rgba(20,184,166,0.12)',
    '0 0 0 7px rgba(94,234,212,0.12)'
  )

  return (
    <Box
      as="span"
      w="7px"
      h="7px"
      borderRadius="full"
      bg={dotColor}
      boxShadow={pulse ? pulseShadow : 'none'}
    />
  )
}

const SectionHead = ({ index, title, extra }) => {
  const ruleColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const accent = useColorModeValue('brand.600', 'brand.300')

  return (
    <Flex align="baseline" gap="16px" mb="36px">
      <Text
        fontFamily="mono"
        fontSize="0.78rem"
        color={accent}
        letterSpacing="0.1em"
      >
        {index}
      </Text>
      <Heading as="h2" variant="section-title">
        {title}
      </Heading>
      <Box flex={1} h="1px" bg={ruleColor} mb={1.5} />
      {extra}
    </Flex>
  )
}

const Card = ({ children, hover = true, ...props }) => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const hoverBorder = useColorModeValue(
    'rgba(15,18,30,0.22)',
    'rgba(255,255,255,0.18)'
  )
  const surface = useColorModeValue(
    'rgba(15,18,30,0.035)',
    'rgba(255,255,255,0.035)'
  )
  const strongSurface = useColorModeValue(
    'rgba(15,18,30,0.07)',
    'rgba(255,255,255,0.065)'
  )
  const shadow = useColorModeValue(
    '0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 24px -16px rgba(15,18,30,0.25)',
    '0 1px 0 rgba(255,255,255,0.03) inset, 0 10px 30px -14px rgba(0,0,0,0.55)'
  )

  return (
    <Box
      bg={surface}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="18px"
      boxShadow={shadow}
      transition="border-color 220ms ease, background 220ms ease, transform 220ms ease"
      _hover={
        hover
          ? {
              borderColor: hoverBorder,
              bg: strongSurface
            }
          : undefined
      }
      {...props}
    >
      {children}
    </Box>
  )
}

const ChipRow = ({ label, items }) => {
  const labelColor = useColorModeValue('ink.400', 'ink.500')

  return (
    <Flex align="center" gap="8px" flexWrap="wrap" mt="24px">
      <Text
        fontFamily="mono"
        fontSize="0.68rem"
        textTransform="uppercase"
        letterSpacing="0.1em"
        color={labelColor}
        mr={1}
      >
        {label}
      </Text>
      {items.map(item => (
        <Badge key={item}>{item}</Badge>
      ))}
    </Flex>
  )
}

const NewsItem = ({ item }) => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const hoverBorder = useColorModeValue('#3B5BFE', '#5EEAD4')
  const warnColor = useColorModeValue('#B97A1B', '#E0B062')
  const defaultTagColor = useColorModeValue('#3B5BFE', '#5EEAD4')
  const hoverBg = useColorModeValue(
    'rgba(15,18,30,0.035)',
    'rgba(255,255,255,0.035)'
  )
  const textColor = useColorModeValue('ink.700', 'ink.200')
  const accentSoft = useColorModeValue(
    'rgba(59,91,254,0.10)',
    'rgba(94,234,212,0.14)'
  )
  const tagColor = item.tag === 'degree' ? warnColor : defaultTagColor

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', md: '80px 110px 1fr' }}
      gap={{ base: '4px', md: '16px' }}
      alignItems="baseline"
      px="18px"
      py="13px"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="12px"
      transition="border-color 220ms ease, background 220ms ease"
      _hover={{
        borderColor: hoverBorder,
        bg: hoverBg
      }}
    >
      <Text fontFamily="mono" fontSize="0.78rem" color="ink.400">
        {item.date}
      </Text>
      <Box
        justifySelf="start"
        fontFamily="mono"
        fontSize="0.66rem"
        letterSpacing="0.1em"
        textTransform="uppercase"
        px="9px"
        py="3px"
        borderRadius="4px"
        border="1px solid"
        borderColor={tagColor}
        color={tagColor}
        bg={item.tag === 'degree' ? 'transparent' : accentSoft}
      >
        {item.tag}
      </Box>
      <Text color={textColor} fontSize="0.94rem">
        {item.text}
      </Text>
    </Box>
  )
}

const RectTag = ({ children, tone = 'accent', ...props }) => {
  const accentColor = useColorModeValue('#3B5BFE', '#5EEAD4')
  const warnColor = useColorModeValue('#B97A1B', '#E0B062')
  const accentBg = useColorModeValue(
    'rgba(59,91,254,0.10)',
    'rgba(94,234,212,0.14)'
  )
  const color = tone === 'warn' ? warnColor : accentColor

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      fontFamily="mono"
      fontSize="0.7rem"
      letterSpacing="0.1em"
      textTransform="uppercase"
      color={color}
      px="9px"
      py="3px"
      border="1px solid"
      borderColor={color}
      borderRadius="4px"
      bg={tone === 'warn' ? 'transparent' : accentBg}
      {...props}
    >
      {children}
    </Box>
  )
}

const PublicationCard = () => {
  const muted = useColorModeValue('ink.500', 'ink.400')
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const accent = useColorModeValue('#3B5BFE', '#5EEAD4')
  const roleColor = useColorModeValue('ink.700', 'ink.200')

  return (
    <Card
      p="22px 22px 18px"
      _hover={{ borderColor: accent, transform: 'translateY(-2px)' }}
    >
      <Flex justify="space-between" align="center" mb="12px">
        <RectTag>arXiv</RectTag>
        <Text fontFamily="mono" fontSize="0.78rem" color={muted}>
          2025
        </Text>
      </Flex>
      <Heading
        as="h3"
        fontSize="1.02rem"
        fontWeight={500}
        lineHeight={1.35}
        mb={2}
      >
        ESPADA: Execution Speedup via Semantics Aware Demonstration Data
        Downsampling for Imitation Learning
      </Heading>
      <Text color={muted} fontSize="0.85rem" mb="14px">
        semantics-aware data downsampling · imitation learning
      </Text>
      <Flex
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap={2}
        pt="12px"
        borderTop="1px dashed"
        borderColor={borderColor}
      >
        <Text fontFamily="mono" fontSize="0.76rem" color={roleColor}>
          co-author · Chungwoo Lee
        </Text>
        <HStack spacing={2}>
          <Button
            as={Link}
            href="https://www.arxiv.org/pdf/2512.07371"
            isExternal
            size="sm"
            variant="outline"
          >
            paper
          </Button>
          <Button
            as={Link}
            href="https://project-espada.github.io/espada/"
            isExternal
            size="sm"
            variant="outline"
          >
            project
          </Button>
        </HStack>
      </Flex>
    </Card>
  )
}

const ProjectCard = ({
  media,
  badge,
  title,
  subtitle,
  description,
  keywords,
  action
}) => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const mediaBg = useColorModeValue('#F2F3F7', '#111319')
  const pattern = useColorModeValue(
    'repeating-linear-gradient(45deg, rgba(15,18,30,0.035) 0 2px, transparent 2px 6px)',
    'repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 6px)'
  )
  const muted = useColorModeValue('ink.500', 'ink.400')
  const bodyColor = useColorModeValue('ink.700', 'ink.200')
  const badgeBg = useColorModeValue(
    'rgba(250,250,252,0.70)',
    'rgba(11,12,16,0.70)'
  )
  const badgeBorder = useColorModeValue(
    'rgba(15,18,30,0.22)',
    'rgba(255,255,255,0.18)'
  )
  const badgeText = useColorModeValue('ink.900', 'ink.50')

  return (
    <Card
      display="grid"
      gridTemplateColumns={{
        base: '1fr',
        md: 'minmax(0, 1fr) minmax(0, 1.3fr)'
      }}
      overflow="hidden"
    >
      <Box
        position="relative"
        bg={`${pattern}, ${mediaBg}`}
        borderRight={{ base: 0, md: '1px solid' }}
        borderBottom={{ base: '1px solid', md: 0 }}
        borderColor={borderColor}
        aspectRatio={{ base: '16 / 9', md: '4 / 3' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {badge && (
          <Box
            position="absolute"
            top="14px"
            left="14px"
            px="11px"
            py="5px"
            borderRadius="full"
            bg={badgeBg}
            border="1px solid"
            borderColor={badgeBorder}
            color={badgeText}
            fontFamily="mono"
            fontSize="0.68rem"
            letterSpacing="0.1em"
            textTransform="uppercase"
            backdropFilter="blur(8px)"
          >
            {badge}
          </Box>
        )}
        {media}
      </Box>
      <Box p={{ base: '24px', md: '26px 28px 24px' }}>
        <Heading as="h3" fontSize="1.45rem" fontWeight={500}>
          {title}
        </Heading>
        {subtitle && (
          <Text
            color={muted}
            fontFamily="mono"
            fontSize="0.8rem"
            letterSpacing="0.02em"
          >
            {subtitle}
          </Text>
        )}
        <Text mt={3} color={bodyColor} fontSize="0.94rem" lineHeight={1.7}>
          {description}
        </Text>
        <HStack mt="14px" spacing="6px" flexWrap="wrap">
          {keywords.map(keyword => (
            <Badge key={keyword}>{keyword}</Badge>
          ))}
        </HStack>
        {action && <Box mt={5}>{action}</Box>}
      </Box>
    </Card>
  )
}

const TimelineItem = ({ item, accent }) => {
  const bgColor = useColorModeValue('#FAFAFC', '#0B0C10')
  const orgColor = useColorModeValue('ink.500', 'ink.400')
  const noteColor = useColorModeValue('ink.700', 'ink.200')

  return (
    <Box as="li" position="relative" pl={9} mb={7}>
      <Box
        position="absolute"
        left={0}
        top="4px"
        w="15px"
        h="15px"
        borderRadius="full"
        bg={bgColor}
        border="1.5px solid"
        borderColor={accent}
        boxShadow={`0 0 0 3px ${bgColor}`}
      />
      <Text fontFamily="mono" fontSize="xs" color={accent} mb={1}>
        {item.period}
      </Text>
      <Heading as="h3" fontSize="lg" fontWeight={500}>
        {item.role}
      </Heading>
      <Text color={orgColor} fontSize="sm">
        {item.url ? (
          <Link href={item.url} isExternal>
            {item.org}
          </Link>
        ) : (
          item.org
        )}
      </Text>
      <VStack as="ul" align="stretch" spacing={1} mt={3} pl={0}>
        {item.notes.map(note => (
          <Text
            as="li"
            key={note}
            listStyleType="none"
            position="relative"
            pl={5}
            fontSize="sm"
            color={noteColor}
            _before={{
              content: '"›"',
              position: 'absolute',
              left: 0,
              color: accent,
              fontFamily: 'mono'
            }}
          >
            {note}
          </Text>
        ))}
      </VStack>
    </Box>
  )
}

const Timeline = ({ items }) => {
  const lineColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
  const accent = useColorModeValue('brand.600', 'brand.300')

  return (
    <Box as="ol" listStyleType="none" m={0} p={0} position="relative">
      <Box
        position="absolute"
        top="6px"
        bottom="6px"
        left="8px"
        w="1px"
        bg={`linear-gradient(to bottom, ${accent}, ${lineColor} 80%)`}
      />
      {items.map(item => (
        <TimelineItem
          key={`${item.period}-${item.role}`}
          item={item}
          accent={accent}
        />
      ))}
    </Box>
  )
}

const EducationLine = ({ items }) => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const strongBorder = useColorModeValue(
    'rgba(15,18,30,0.22)',
    'rgba(255,255,255,0.18)'
  )
  const accent = useColorModeValue('brand.600', 'brand.300')
  const bgColor = useColorModeValue('#FAFAFC', '#0B0C10')
  const popBg = useColorModeValue('#F2F3F7', '#111319')
  const degreeColor = useColorModeValue('ink.700', 'ink.200')
  const muted = useColorModeValue('ink.500', 'ink.400')
  const accentSoft = useColorModeValue(
    'rgba(59,91,254,0.10)',
    'rgba(94,234,212,0.14)'
  )
  const popShadow = useColorModeValue(
    '0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 60px -30px rgba(15,18,30,0.30)',
    '0 1px 0 rgba(255,255,255,0.05) inset, 0 28px 70px -24px rgba(0,0,0,0.65)'
  )
  const headingColor = useColorModeValue('ink.900', 'ink.50')

  return (
    <Box>
      <Flex
        position="relative"
        justify="space-between"
        align={{ base: 'stretch', md: 'flex-start' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '28px', md: '16px' }}
        pt={{ base: 4, md: '56px' }}
        px={{ base: 0, md: 2 }}
        pb={{ base: 4, md: '28px' }}
        maxW="880px"
        mx="auto"
      >
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          top="70px"
          left="8%"
          right="8%"
          h="1px"
          bg={`linear-gradient(to right, ${borderColor}, ${accent} 50%, ${borderColor})`}
        />
        {items.map(item => (
          <Flex
            key={`${item.date}-${item.school}`}
            role="group"
            tabIndex={0}
            position="relative"
            flex={1}
            direction={{ base: 'row', md: 'column' }}
            align={{ base: 'center', md: 'center' }}
            gap={{ base: '14px', md: 0 }}
            outline="none"
          >
            <Box
              w="16px"
              h="16px"
              borderRadius="full"
              bg={bgColor}
              border="1.5px solid"
              borderColor={accent}
              boxShadow={`0 0 0 4px ${bgColor}`}
              transition="transform 220ms ease, background 220ms ease, box-shadow 220ms ease"
              _groupHover={{
                transform: 'scale(1.2)',
                bg: accent,
                boxShadow: `0 0 0 4px ${bgColor}, 0 0 16px ${accentSoft}`
              }}
            />
            <Text
              mt={{ base: 0, md: '14px' }}
              fontFamily="mono"
              fontSize="0.78rem"
              color={muted}
              letterSpacing="0.02em"
              minW={{ base: '72px', md: 'auto' }}
            >
              {item.date}
            </Text>
            <Box
              position={{ base: 'static', md: 'absolute' }}
              bottom={{ md: 'calc(100% + 14px)' }}
              left={{ md: '50%' }}
              transform={{ base: 'none', md: 'translate(-50%, 6px)' }}
              w={{ base: 'auto', md: '260px' }}
              flex={{ base: 1, md: 'initial' }}
              p="14px 16px"
              bg={popBg}
              border="1px solid"
              borderColor={strongBorder}
              borderRadius="12px"
              boxShadow={popShadow}
              opacity={{ base: 1, md: 0 }}
              pointerEvents={{ base: 'auto', md: 'none' }}
              transition="opacity 220ms ease, transform 220ms ease"
              zIndex={5}
              _groupHover={{
                opacity: 1,
                transform: { md: 'translate(-50%, 0)' }
              }}
              _groupFocus={{
                opacity: 1,
                transform: { md: 'translate(-50%, 0)' }
              }}
              _after={{
                content: { base: 'none', md: '""' },
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '6px solid transparent',
                borderTopColor: strongBorder
              }}
            >
              <Text
                fontFamily="heading"
                color={headingColor}
                fontSize="0.98rem"
                fontWeight={500}
                mb="2px"
              >
                {item.school}
              </Text>
              <Text color={degreeColor} fontSize="0.82rem" mb="8px">
                {item.degree}
              </Text>
              <HStack
                fontFamily="mono"
                fontSize="0.74rem"
                color={muted}
                mb="8px"
                spacing={2}
              >
                <Kbd>period</Kbd>
                <Text>{item.date}</Text>
              </HStack>
              <Text color={muted} fontSize="0.82rem" lineHeight={1.5} m={0}>
                {item.note}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
      <Text
        textAlign="center"
        fontFamily="mono"
        fontSize="0.74rem"
        color={muted}
        mt={2}
      >
        hover or focus a node for details
      </Text>
    </Box>
  )
}

const Home = () => {
  const [showOldNews, setShowOldNews] = useState(false)
  const muted = useColorModeValue('ink.500', 'ink.400')
  const bodyColor = useColorModeValue('ink.700', 'ink.200')
  const accent = useColorModeValue('brand.600', 'brand.300')
  const softAccent = useColorModeValue(
    'rgba(59,91,254,0.10)',
    'rgba(94,234,212,0.14)'
  )

  return (
    <Layout>
      <Script
        id="mapmyvisitors-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var VISITOR_MAP_ID = 'GKdDx4kekCJ52WV6ap4TUkdSn0-_t_CcGqV7t8V3m2E';
              var renderKey = '';
              var resizeTimeout;
              var themeTimeout;
              var loadInterval;

              var palettes = {
                dark: {
                  cl: 'f2f3f5',
                  co: '0b0c10',
                  ct: 'f2f3f5',
                  cmo: '5eead4',
                  cmn: 'ff6b6b',
                  bg: '#111319'
                },
                light: {
                  cl: '0f1220',
                  co: 'fafafc',
                  ct: '0f1220',
                  cmo: '3b5bfe',
                  cmn: 'b97a1b',
                  bg: '#f2f3f7'
                }
              };

              function getColorMode() {
                var body = document.body;
                var html = document.documentElement;
                var stored = null;

                try {
                  stored = localStorage.getItem('chakra-ui-color-mode');
                } catch (e) {}

                if (body && body.classList.contains('chakra-ui-light')) return 'light';
                if (body && body.classList.contains('chakra-ui-dark')) return 'dark';
                if (html && html.dataset && html.dataset.theme === 'light') return 'light';
                if (html && html.dataset && html.dataset.theme === 'dark') return 'dark';
                if (stored === 'light' || stored === 'dark') return stored;
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
                return 'dark';
              }

              function getMapWidth(container) {
                var containerWidth = container.clientWidth || window.innerWidth;
                var mapWidth = Math.min(containerWidth - 32, 800);
                if (mapWidth < 300) mapWidth = containerWidth - 24;
                return Math.max(Math.round(mapWidth), 280);
              }

              function clearMap(container) {
                if (loadInterval) {
                  clearInterval(loadInterval);
                  loadInterval = null;
                }

                var existingScript = document.getElementById('mapmyvisitors');
                if (existingScript) existingScript.remove();
                if (container) container.innerHTML = '';
              }

              function initMapMyVisitors(force) {
                var container = document.getElementById('map-area');
                if (!container) return;

                var mode = getColorMode();
                var palette = palettes[mode] || palettes.dark;
                var mapWidth = getMapWidth(container);
                var nextKey = mode + ':' + mapWidth;
                if (renderKey === nextKey && container.childNodes.length > 0) return;
                renderKey = nextKey;

                clearMap(container);
                container.dataset.mapTheme = mode;
                container.style.background = palette.bg;
                container.style.borderRadius = '18px';

                var script = document.createElement('script');
                script.id = 'mapmyvisitors';
                script.type = 'text/javascript';
                script.src =
                  'https://mapmyvisitors.com/map.js?cl=' + palette.cl +
                  '&w=' + mapWidth +
                  '&t=m&d=' + VISITOR_MAP_ID +
                  '&co=' + palette.co +
                  '&ct=' + palette.ct +
                  '&cmo=' + palette.cmo +
                  '&cmn=' + palette.cmn;
                script.async = true;
                container.appendChild(script);

                var tries = 0;
                loadInterval = setInterval(function () {
                  var inner = container.firstElementChild;
                  if (inner && inner !== script) {
                    container.style.overflow = 'hidden';
                    inner.style.marginTop = '-40px';
                    inner.style.transition = 'filter 200ms ease, opacity 200ms ease';
                    clearInterval(loadInterval);
                    loadInterval = null;
                  }
                  if (++tries > 20) {
                    clearInterval(loadInterval);
                    loadInterval = null;
                  }
                }, 500);
              }

              function scheduleMapRender(force, delay) {
                clearTimeout(themeTimeout);
                themeTimeout = setTimeout(function () {
                  initMapMyVisitors(force);
                }, delay || 120);
              }

              if (document.readyState === 'complete' || document.readyState === 'interactive') {
                initMapMyVisitors(true);
              } else {
                document.addEventListener('DOMContentLoaded', function () {
                  initMapMyVisitors(true);
                });
              }

              window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () {
                  initMapMyVisitors(true);
                }, 300);
              });

              window.addEventListener('storage', function(event) {
                if (event.key === 'chakra-ui-color-mode') {
                  scheduleMapRender(true, 180);
                }
              });

              document.addEventListener('click', function(event) {
                var target = event.target;
                if (target && target.closest && target.closest('[aria-label="Toggle theme"]')) {
                  scheduleMapRender(true, 260);
                }
              });

              var observer = new MutationObserver(function () {
                scheduleMapRender(true, 180);
              });

              function observeThemeAttributes() {
                if (document.documentElement) {
                  observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'style']
                  });
                }
                if (document.body) {
                  observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['class', 'style']
                  });
                }
              }

              if (document.body) {
                observeThemeAttributes();
              } else {
                document.addEventListener('DOMContentLoaded', observeThemeAttributes);
              }
            })();
          `
        }}
      />

      <Container maxW="1040px" px={0}>
        <Section id="about" delay={0} my={0} mt="24px">
          <Box position="relative" pt={{ base: '24px', md: '40px' }} pb="24px">
            <Flex
              gap={3}
              flexWrap="wrap"
              fontFamily="mono"
              fontSize="xs"
              color={muted}
              mb="28px"
            >
              <HStack spacing={2}>
                <Kbd>location</Kbd>
                <IoLocationSharp />
                <Text>Seoul, South Korea</Text>
              </HStack>
              <HStack spacing={2}>
                <Kbd>status</Kbd>
                <StatusDot pulse />
                <Text>M.S. Student</Text>
              </HStack>
            </Flex>

            <Box
              position={{ base: 'static', md: 'absolute' }}
              top={{ md: '32px' }}
              right={0}
              w={{ base: '112px', md: '156px', lg: '172px' }}
              h={{ base: '112px', md: '156px', lg: '172px' }}
              mb={{ base: 5, md: 0 }}
            >
              <ChakraImage
                src="/images/chungwoo.jpg"
                alt="Lee Chung-woo"
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="full"
                border="1px solid"
                borderColor={useColorModeValue(
                  'blackAlpha.200',
                  'whiteAlpha.300'
                )}
              />
            </Box>

            <Heading as="h1" variant="page-title" maxW="760px">
              Lee Chung-woo
            </Heading>
            <Text
              mt={4}
              fontFamily="mono"
              fontSize={{ base: 'sm', md: 'md' }}
              letterSpacing="0.02em"
              color={accent}
            >
              M.S. Student · Interdisciplinary Program in Artificial
              Intelligence
            </Text>
            <Text
              mt={2}
              fontFamily="heading"
              fontSize={{ base: 'xl', md: '2xl' }}
              color={bodyColor}
            >
              Better spatial perception for better embodied action.
            </Text>
            <HStack mt={4} color={muted} fontFamily="mono" fontSize="sm">
              <IoFlask color={accent} />
              <Link href="https://gsai.snu.ac.kr/" isExternal color="inherit">
                Seoul National University · GSAI
              </Link>
            </HStack>

            <Box maxW="720px" mt={8} color={bodyColor}>
              <Paragraph>
                I am a Master’s student in the{' '}
                <Link href="https://gsai.snu.ac.kr/" isExternal>
                  Interdisciplinary Program in Artificial Intelligence at Seoul
                  National University
                </Link>
                , advised by{' '}
                <Link href="https://bi.snu.ac.kr/" isExternal>
                  Prof. Byoung-Tak Zhang
                </Link>
                . I received my B.S. in{' '}
                <Link href="https://ae.hanyang.ac.kr/%ED%99%88" isExternal>
                  Automotive Engineering from Hanyang University
                </Link>
                .
              </Paragraph>
              <Paragraph>
                My research interests lie in Vision-Language-Action (VLA) and
                Vision-and-Language Navigation (VLN), with a focus on developing
                spatial perception capabilities for intelligent agents that can
                effectively perceive and interact with dynamic real-world
                environments.
              </Paragraph>
            </Box>

            <ChipRow label="research interests" items={interests} />

            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} mt={8}>
              <Button
                as={Link}
                href="mailto:canwooj@gmail.com"
                leftIcon={<IoMailUnread />}
              >
                get in touch
              </Button>
              <Button
                as={Link}
                href="https://github.com/lcwoo"
                isExternal
                variant="outline"
                leftIcon={<IoLogoGithub />}
              >
                github
              </Button>
              <Button
                as={Link}
                href="https://www.linkedin.com/in/chungwoo-lee"
                isExternal
                variant="outline"
                leftIcon={<IoLogoLinkedin />}
              >
                linkedin
              </Button>
            </Stack>
          </Box>
        </Section>

        <Section id="live-demo" delay={0.06}>
          <SectionHead
            index="01"
            title="Demo"
            extra={<RectTag>3D Gaussian Splatting</RectTag>}
          />
          <Scene />
        </Section>

        <Section id="news" delay={0.1}>
          <SectionHead
            index="02"
            title="News"
            extra={
              <Button
                size="xs"
                variant="ghost"
                rightIcon={
                  showOldNews ? <ChevronUpIcon /> : <ChevronDownIcon />
                }
                onClick={() => setShowOldNews(!showOldNews)}
              >
                old news
              </Button>
            }
          />
          <VStack align="stretch" spacing={2}>
            {news.map(item => (
              <NewsItem key={`${item.date}-${item.text}`} item={item} />
            ))}
            <Collapse in={showOldNews} animateOpacity>
              <VStack align="stretch" spacing={2} mt={2}>
                {oldNews.map(item => (
                  <NewsItem key={`${item.date}-${item.text}`} item={item} />
                ))}
              </VStack>
            </Collapse>
          </VStack>
        </Section>

        <Section id="publications" delay={0.14}>
          <SectionHead index="03" title="Publications" />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="16px">
            <PublicationCard />
          </SimpleGrid>
          <Text
            fontFamily="mono"
            fontSize="0.76rem"
            color={muted}
            mt="18px"
            textAlign="center"
          >
            <Link as={NextLink} href="/publications">
              view publication archive
            </Link>
          </Text>
        </Section>

        <Section id="selected-projects" delay={0.18}>
          <SectionHead index="04" title="Selected Projects" />
          <Stack spacing="22px">
            <ProjectCard
              badge="homepage"
              title="Interactive personal homepage"
              subtitle="Next.js · Chakra UI · Three.js"
              description="A research homepage with responsive layout, dark/light mode, and an interactive Gaussian Splatting scene using the Iron Man ksplat asset included in this project."
              keywords={['Next.js', 'Chakra UI', 'Three.js', 'Framer Motion']}
              media={
                <ChakraImage
                  src="/images/preview.png"
                  alt="Homepage preview"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  objectPosition="center"
                />
              }
            />
          </Stack>
        </Section>

        <Section id="experience" delay={0.22}>
          <SectionHead index="05" title="Experience" />
          <Timeline items={experience} />
        </Section>

        <Section id="education" delay={0.26}>
          <SectionHead index="06" title="Education" />
          <EducationLine items={education} />
        </Section>

        <Section id="contact" delay={0.3}>
          <SectionHead index="07" title="Contact" />
          <Card
            p={{ base: 6, md: 8 }}
            display="grid"
            gridTemplateColumns={{ base: '1fr', md: '1.15fr 1fr' }}
            gap={7}
            alignItems="center"
          >
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight={500}
              >
                Let&apos;s discuss spatial intelligence for embodied agents.
              </Heading>
              <Text mt={3} color={bodyColor}>
              Open to research conversations on VLA, VLN, robotics, and perception systems for dynamic environments.
              </Text>
            </Box>
            <VStack align="stretch" spacing={3}>
              {contactLinks.map(item => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    as={Link}
                    href={item.href}
                    isExternal={item.external}
                    variant={item.shortLabel === 'email' ? 'solid' : 'outline'}
                    leftIcon={<Icon />}
                    justifyContent="flex-start"
                  >
                    {item.label}
                  </Button>
                )
              })}
            </VStack>
          </Card>
        </Section>

        <Section id="visitors" delay={0.34}>
          <SectionHead index="08" title="Visitors" />
          <Card p={{ base: 3, md: 5 }}>
            <Box
              id="map-area"
              w="100%"
              maxW="800px"
              mx="auto"
              minH="300px"
              borderRadius="18px"
              overflow="hidden"
            />
          </Card>
        </Section>
      </Container>
    </Layout>
  )
}

export default Home
export { getStaticProps } from '../components/chakra'
