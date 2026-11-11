import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { SceneContainer } from '../components/scene-loader'
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
  HStack,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import AuthorNames from '../components/author-names'
import PublicationThumbnail from '../components/publication-thumbnail'
import { getPublications } from '../data/publications'
import {
  IoMailUnread,
  IoLogoLinkedin,
  IoSchool,
  IoLogoGithub
} from 'react-icons/io5'
import Script from 'next/script'
import styles from '../components/home-folio.module.css'

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

// The 3DGS viewer downloads ~4 MB, so it starts only when needed:
// on desktop when it scrolls near the viewport, on phones when tapped.
const LazyScene = () => {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return undefined
    const desktop = window.matchMedia(
      '(min-width: 768px) and (pointer: fine)'
    ).matches
    if (!desktop || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  if (active) return <Scene />

  return (
    <Box ref={ref}>
      <SceneContainer>
        <Flex h="100%" align="center" justify="center" position="relative">
          <Box
            as="img"
            src="/images/splat-preview.webp"
            alt="Iron Man 3DGS sample scene preview"
            width="400"
            height="480"
            loading="lazy"
            decoding="async"
            h="90%"
            w="auto"
            objectFit="contain"
            opacity={0.85}
          />
          <Flex
            position="absolute"
            bottom="24px"
            left={4}
            right={4}
            justify="center"
            zIndex={4}
          >
            <Button
              size="sm"
              w="100%"
              maxW="280px"
              minH="44px"
              boxShadow="none"
              whiteSpace="normal"
              onClick={() => setActive(true)}
              zIndex={4}
            >
              Load interactive 3D · 4 MB
            </Button>
          </Flex>
        </Flex>
      </SceneContainer>
    </Box>
  )
}

// News is grouped by year. The current year stays visible; earlier years go under "old news".
// `month` is optional; leave it empty when the exact month is not known.
const CURRENT_NEWS_YEAR = '2026'

const allNews = [
  {
    year: '2026',
    month: 'Oct',
    tag: 'accepted',
    text: 'SARAM was accepted to the NeurIPS 2026 Robot Learning Workshop.'
  },
  {
    year: '2026',
    month: 'Sep',
    tag: 'accepted',
    text: 'DILL was accepted to CoRL 2026 and selected for an RSS SemRob Spotlight.'
  },
  {
    year: '2026',
    month: 'May',
    tag: 'accepted',
    text: 'ESPADA was accepted for publication in IEEE RA-L and will be presented at IROS 2026.'
  },
  {
    year: '2026',
    month: 'Mar',
    tag: 'milestone',
    text: 'Started my M.S. at Seoul National University (GSAI).'
  },
  {
    year: '2025',
    month: 'Jun',
    tag: 'research',
    text: 'Started as a Research Intern at Seoul National University AI Institute in June 2025.'
  },
  {
    year: '2025',
    month: 'Jun',
    tag: 'research',
    text: 'Joined Tommoro Robotics as an Associate Researcher (June 2025 – January 2026).'
  },
  {
    year: '2025',
    month: 'Feb',
    tag: 'degree',
    text: 'Graduated in February 2025 with a B.S. in Automotive Engineering from Hanyang University.'
  }
]

const groupNewsByYear = items =>
  items.reduce((groups, item) => {
    const last = groups[groups.length - 1]
    if (last && last.year === item.year) last.items.push(item)
    else groups.push({ year: item.year, items: [item] })
    return groups
  }, [])

const newsGroups = groupNewsByYear(
  allNews.filter(item => item.year === CURRENT_NEWS_YEAR)
)
const oldNewsGroups = groupNewsByYear(
  allNews.filter(item => item.year !== CURRENT_NEWS_YEAR)
)

const education = [
  {
    date: '2019',
    initials: 'BH',
    school: 'Boin High School',
    degree: 'High School',
    note: 'Completed secondary education.'
  },
  {
    date: '2025',
    initials: 'HYU',
    school: 'Hanyang University',
    degree: 'B.S., Dept. of Automotive Engineering',
    note: 'Bachelor of Science in Automotive Engineering.'
  },
  {
    date: '2026 – Present',
    initials: 'SNU',
    school: 'Seoul National University',
    degree: 'M.S., Interdisciplinary Program in Artificial Intelligence',
    note: 'Advised by Prof. Byoung-Tak Zhang. Expected graduation: February 2028.'
  }
]

const experience = [
  {
    period: '2026.03 – Present',
    role: 'M.S. Student',
    org: 'Interdisciplinary Program in Artificial Intelligence at Seoul National University',
    url: 'https://gsai.snu.ac.kr/',
    notes: [
      'Researching 3D-grounded Vision-Language-Action (VLA) and visuomotor policies for robot manipulation, along with Vision-and-Language Navigation (VLN).',
      'Running robot experiments and teleoperated data collection on Mobile ALOHA, AI Worker, UR5e with GELLO, TurtleBot3, and Unitree Go2.'
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
    role: 'Associate Researcher',
    org: 'Tommoro Robotics',
    url: 'https://tommoro.ai/',
    notes: [
      'Worked on robotics research and development as an associate researcher.'
    ]
  },
  {
    period: '2023.08 – 2024.09',
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

const interests = ['Embodied AI', 'Machine Learning', 'Robot Learning']

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
  },
  {
    label: 'Google Scholar',
    shortLabel: 'scholar',
    href: 'https://scholar.google.com/citations?user=vZd6tSEAAAAJ',
    icon: IoSchool,
    external: true
  }
]

const SectionHead = ({ index, title, extra }) => (
  <Box className={styles.sectionHeading}>
    <Text className={styles.sectionIndex}>{index} /</Text>
    <Heading
      as="h2"
      fontSize="1.5rem"
      fontWeight={500}
      letterSpacing="-0.035em"
    >
      {title}
    </Heading>
    {extra && <Box mt={4}>{extra}</Box>}
  </Box>
)

const NewsItem = ({ item }) => (
  <Box className={styles.newsRow}>
    <Text className={styles.mutedMeta}>{item.month || '—'}</Text>
    <Text className={styles.newsTag}>{item.tag}</Text>
    <Text className={styles.newsText}>{item.text}</Text>
  </Box>
)

const NewsYearGroup = ({ group }) => (
  <Box>
    <Text className={styles.yearLabel}>{group.year}</Text>
    {group.items.map(item => (
      <NewsItem key={`${item.year}-${item.text}`} item={item} />
    ))}
  </Box>
)

const HomeVenueTag = ({ children, primary = false, href }) => {
  const accentColor = useColorModeValue('#3B5BFE', '#5EEAD4')
  const mutedColor = useColorModeValue('ink.500', 'ink.400')
  const color = primary ? accentColor : mutedColor

  return (
    <Box
      as={href ? Link : 'span'}
      href={href}
      {...(href ? { isExternal: true } : {})}
      display="inline-flex"
      alignItems="center"
      gap="6px"
      fontFamily="mono"
      fontSize="0.75rem"
      letterSpacing="0.01em"
      color={color}
      lineHeight={1.4}
      whiteSpace="nowrap"
      _hover={href ? { opacity: 0.72, textDecoration: 'none' } : undefined}
    >
      {primary && (
        <Box
          aria-hidden="true"
          w="5px"
          h="5px"
          borderRadius="full"
          bg={accentColor}
          flexShrink={0}
        />
      )}
      {children}
    </Box>
  )
}

const PublicationCard = ({ publication, featured = false }) => {
  const { title, authors, venues, links = {} } = publication
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
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
      className={styles.publicationRow}
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="start"
        gap={{ base: 5, md: 7 }}
      >
        <PublicationThumbnail
          publication={publication}
          size={featured ? 'featured' : 'home'}
        />
        <Box minW={0} flex={1}>
          <Flex gap="12px" flexWrap="wrap" mb="6px">
            {venues.map(venue => (
              <HomeVenueTag
                key={venue.homeLabel}
                primary={venue.primary}
                href={venue.href}
              >
                {venue.homeLabel}
              </HomeVenueTag>
            ))}
          </Flex>
          <Heading
            as="h3"
            fontSize={{ base: '1rem', md: featured ? '1.125rem' : '1rem' }}
            fontWeight={500}
            lineHeight={1.35}
          >
            {title}
          </Heading>
          <Box mt="4px">
            <AuthorNames authors={authors} fontSize="0.8rem" lineHeight={1.5} />
          </Box>
          {actions.length > 0 && (
            <HStack spacing={4} mt="6px" flexWrap="wrap">
              {actions.map(([label, href]) => {
                // Site pages (e.g. /posters/#id) open in place; files and external URLs open in a new tab.
                const isSitePage =
                  href.startsWith('/') &&
                  !/\.[a-z0-9]+$/i.test(href.split('#')[0])
                return (
                  <Link
                    key={label}
                    href={href}
                    as={isSitePage ? NextLink : undefined}
                    isExternal={!isSitePage}
                    fontFamily="mono"
                    fontSize="0.75rem"
                    color={accent}
                    letterSpacing="0.02em"
                  >
                    {label} {isSitePage ? '→' : '↗'}
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

const Timeline = ({ items }) => (
  <Box as="ol" m={0} p={0} listStyleType="none">
    {items.map(item => (
      <Box
        as="li"
        className={styles.careerRow}
        key={`${item.period}-${item.role}`}
      >
        <Text className={styles.mutedMeta}>{item.period}</Text>
        <Box>
          <Heading as="h3" fontSize="1.1rem" fontWeight={500} mb={2}>
            {item.role}
          </Heading>
          <Text fontSize="sm" mb={3}>
            {item.url ? (
              <Link href={item.url} isExternal>
                {item.org}
              </Link>
            ) : (
              item.org
            )}
          </Text>
          {item.notes.map(note => (
            <Text
              key={note}
              className={styles.secondaryText}
              fontSize="sm"
              lineHeight={1.7}
            >
              {note}
            </Text>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
)

const EducationLine = ({ items }) => (
  <Box className={styles.educationList}>
    {[...items].reverse().map(item => (
      <Box className={styles.educationRow} key={item.school}>
        <Box className={styles.schoolMark} aria-hidden="true">
          {item.initials}
        </Box>
        <Box>
          <Text className={styles.mutedMeta} mb={2}>
            {item.date}
          </Text>
          <Heading as="h3" fontSize="1.1rem" fontWeight={500} mb={1}>
            {item.school}
          </Heading>
          <Text fontSize="sm" lineHeight={1.6}>
            {item.degree}
          </Text>
          <Text
            className={styles.secondaryText}
            fontSize="sm"
            lineHeight={1.7}
            mt={2}
          >
            {item.note}
          </Text>
        </Box>
      </Box>
    ))}
  </Box>
)

const Home = () => {
  const [showOldNews, setShowOldNews] = useState(false)
  const accent = useColorModeValue('brand.600', 'brand.300')

  return (
    <Layout>
      <Script
        id="mapmyvisitors-loader"
        strategy="lazyOnload"
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

      <Container maxW="1120px" px={0} className={styles.folio}>
        <Section id="about" delay={0} my={0} className={styles.hero}>
          <Box className={styles.heroMain}>
            <Box className={styles.heroIntro}>
              <Text className={styles.heroEyebrow}>
                3D-Grounded Robot Learning
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: '2.5rem', md: '3.25rem' }}
                fontWeight={500}
                letterSpacing="-0.055em"
                lineHeight={1.12}
              >
                Chungwoo Lee
              </Heading>
              <Text mt={4} color={accent} fontSize="sm" lineHeight={1.7}>
                M.S. Student · Interdisciplinary Program in Artificial
                Intelligence
              </Text>
              <Text
                mt={4}
                fontFamily="heading"
                fontSize={{ base: 'lg', md: '1.45rem' }}
                lineHeight={1.5}
                maxW="640px"
              >
                Better spatial perception for better embodied action.
              </Text>
            </Box>
            <Box className={styles.heroDetails}>
              <Box className={styles.biography}>
                <Paragraph>
                  I am a master’s student in the{' '}
                  <Link href="https://gsai.snu.ac.kr/" isExternal>
                    Interdisciplinary Program in Artificial Intelligence at
                    Seoul National University
                  </Link>
                  , advised by{' '}
                  <Link href="https://bi.snu.ac.kr/" isExternal>
                    Prof. Byoung-Tak Zhang
                  </Link>
                  . I received my bachelor’s degree in{' '}
                  <Link href="https://ae.hanyang.ac.kr/%ED%99%88" isExternal>
                    Automotive Engineering from Hanyang University
                  </Link>
                  .
                </Paragraph>
                <Paragraph>
                  My research is in robot learning, with a focus on
                  manipulation. I study how Vision-Language-Action (VLA) and
                  visuomotor policies can use the 3D structure of a scene, such
                  as point clouds and object geometry, to act reliably across
                  new viewpoints, objects, and environments. I have also worked
                  on Vision-and-Language Navigation (VLN) with real robots.
                </Paragraph>
              </Box>
              <Flex
                className={styles.heroLinks}
                direction={{ base: 'column', md: 'row' }}
                align="flex-start"
                gap={3}
              >
                {contactLinks
                  .filter(item => item.shortLabel === 'email')
                  .map(item => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.href}
                        as={Link}
                        href={item.href}
                        isExternal={item.external}
                        variant="solid"
                        leftIcon={<Icon />}
                      >
                        Get in touch
                      </Button>
                    )
                  })}
                <Flex
                  className={styles.heroSocialLinks}
                  gap={3}
                  flexWrap="nowrap"
                >
                  {contactLinks
                    .filter(item => item.shortLabel !== 'email')
                    .map(item => {
                      const Icon = item.icon
                      return (
                        <Button
                          key={item.href}
                          as={Link}
                          href={item.href}
                          isExternal
                          variant="outline"
                          leftIcon={<Icon />}
                        >
                          {
                            {
                              github: 'GitHub',
                              linkedin: 'LinkedIn',
                              scholar: 'Scholar'
                            }[item.shortLabel]
                          }
                        </Button>
                      )
                    })}
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box as="aside" className={styles.profileAside}>
            <ChakraImage
              src="/images/chungwoo.webp"
              alt="Chungwoo Lee"
              w="144px"
              h="144px"
              borderRadius="full"
              objectFit="cover"
              mb={6}
            />
            <Text fontWeight={500} fontSize="sm">
              Seoul National University
            </Text>
            <Text className={styles.secondaryText} fontSize="sm" mt={1}>
              Graduate School of AI
            </Text>
            <Text className={styles.mutedMeta} mt={4}>
              Seoul, South Korea
            </Text>
            <Box className={styles.interestList}>
              <Text className={styles.mutedMeta} mb={3}>
                <Text as="span" role="img" aria-label="Robot" mr={2}>
                  🤖
                </Text>
                Research interests
              </Text>
              {interests.map(item => (
                <Text key={item} fontSize="sm" py={2}>
                  {item}
                </Text>
              ))}
            </Box>
          </Box>
        </Section>

        <Section id="publications" className={styles.editorialSection}>
          <SectionHead index="01" title="Publications" />
          <Box minW={0}>
            {getPublications().map(publication => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                featured={publication.venues.some(venue => venue.primary)}
              />
            ))}
            <Flex justify="space-between" flexWrap="wrap" gap={4} mt={6}>
              <Text className={styles.mutedMeta}>
                * Equal contribution · † Corresponding author
              </Text>
              <Link as={NextLink} href="/publications" fontSize="sm">
                Publication archive ↗
              </Link>
            </Flex>
          </Box>
        </Section>

        <Section id="news" className={styles.editorialSection}>
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
                aria-expanded={showOldNews}
              >
                Earlier news
              </Button>
            }
          />
          <Box minW={0}>
            {newsGroups.map(group => (
              <NewsYearGroup key={group.year} group={group} />
            ))}
            <Collapse in={showOldNews} animateOpacity>
              {oldNewsGroups.map(group => (
                <NewsYearGroup key={group.year} group={group} />
              ))}
            </Collapse>
          </Box>
        </Section>

        <Section
          id="ongoing"
          className={`${styles.editorialSection} ${styles.ongoingSection}`}
        >
          <SectionHead index="03" title="Ongoing research" />
          <Box minW={0}>
            <Text fontSize="md" lineHeight={1.7} maxW="680px" mb={4}>
              Exploring persistent 3D interaction representations for
              Vision-Language-Action policies that remain grounded across
              viewpoint changes, articulation, and occlusion.
            </Text>
            <Box className={styles.experimentPanel}>
              <Box className={styles.experimentCaption}>
                <Heading as="h3" fontSize="lg" fontWeight={500} mb={2}>
                  Interactive 3DGS viewer
                </Heading>
                <Text
                  className={styles.secondaryText}
                  fontSize="xs"
                  lineHeight={1.7}
                >
                  Interactive Iron Man sample scene for visualization, not a
                  research result.
                </Text>
              </Box>
              <Box minW={0}>
                <LazyScene />
              </Box>
            </Box>
          </Box>
        </Section>

        <Section id="experience" className={styles.editorialSection}>
          <SectionHead index="04" title="Experience" />
          <Timeline items={experience} />
        </Section>

        <Section id="education" className={styles.editorialSection}>
          <SectionHead index="05" title="Education" />
          <EducationLine items={education} />
        </Section>

        <Section id="contact" className={styles.contactSection}>
          <Box>
            <Text className={styles.sectionIndex} mb={5}>
              06 / Contact
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '1.8rem', md: '2.5rem' }}
              fontWeight={500}
              letterSpacing="-0.045em"
              lineHeight={1.25}
              maxW="600px"
            >
              Let’s talk about 3D-grounded robot learning.
            </Heading>
            <Text
              className={styles.secondaryText}
              fontSize="sm"
              lineHeight={1.8}
              mt={5}
              maxW="520px"
            >
              Open to research conversations on VLA policies, robot
              manipulation, 3D scene representations, and navigation.
            </Text>
          </Box>
          <Box className={styles.contactLinks}>
            {contactLinks.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  isExternal={item.external}
                  className={styles.contactLink}
                >
                  <Flex gap={3} align="center">
                    <Icon />
                    <Text>{item.label}</Text>
                  </Flex>
                  <Text aria-hidden="true">↗</Text>
                </Link>
              )
            })}
          </Box>
        </Section>

        {/* Visitor map is hidden from the page; the MapMyVisitors script still
            loads here so visits keep being counted on the owner's dashboard. */}
        <Box
          id="map-area"
          aria-hidden="true"
          position="absolute"
          left="-10000px"
          top="0"
          w="300px"
          h="200px"
          overflow="hidden"
          pointerEvents="none"
        />
      </Container>
    </Layout>
  )
}

export default Home
export { getStaticProps } from '../components/chakra'
