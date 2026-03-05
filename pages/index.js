import { useState } from 'react';
import NextLink from 'next/link';
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  Collapse,
  Text,
  Image as ChakraImage,
  VStack
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Paragraph from '../components/paragraph';
import { BioSection, BioYear } from '../components/bio';
import Layout from '../components/layouts/article';
import Section from '../components/section';
import { IoMailUnread, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5';
import Image from 'next/image';
import Script from 'next/script';

const Home = () => {
  const [showOldNews, setShowOldNews] = useState(false);

  return (
    <Layout>
      <Script
        id="mapmyvisitors-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              function initMapMyVisitors() {
                var container = document.getElementById('map-area');
                if (!container) return;

                // Calculate responsive width
                var containerWidth = container.clientWidth || window.innerWidth;
                var mapWidth = Math.min(containerWidth - 32, 800); // 32px for padding, max 800px
                if (mapWidth < 300) mapWidth = containerWidth - 24; // Smaller padding on mobile

                var script = document.createElement('script');
                script.id = 'mapmyvisitors';
                script.type = 'text/javascript';
                script.src = 'https://mapmyvisitors.com/map.js?cl=ffffff&w=' + mapWidth + '&t=m&d=GKdDx4kekCJ52WV6ap4TUkdSn0-_t_CcGqV7t8V3m2E&co=2d78ad&ct=ffffff&cmo=3acc3a&cmn=ff5353';
                script.async = true;
                container.appendChild(script);

                var tries = 0;
                var iv = setInterval(function () {
                  var inner = container.firstElementChild;
                  if (inner && inner !== script) {
                    container.style.overflow = 'hidden';
                    inner.style.marginTop = '-40px';
                    clearInterval(iv);
                  }
                  if (++tries > 20) clearInterval(iv);
                }, 500);
              }

              function handleResize() {
                var existingScript = document.getElementById('mapmyvisitors');
                if (existingScript) {
                  existingScript.remove();
                  var container = document.getElementById('map-area');
                  if (container) {
                    container.innerHTML = '';
                  }
                }
                initMapMyVisitors();
              }

              if (document.readyState === 'complete' || document.readyState === 'interactive') {
                initMapMyVisitors();
              } else {
                document.addEventListener('DOMContentLoaded', initMapMyVisitors);
              }
              
              // Handle window resize
              var resizeTimeout;
              window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(handleResize, 300);
              });
            })();
          `,
        }}
      />

      <Container 
        maxW={{ base: '100%', md: 'container.2xl' }}
        px={{ base: 3, md: 6 }}
      >

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Lee Chung-woo
            </Heading>
            <p>
              M.S. Student in the{' '}
              <Link
                href="https://gsai.snu.ac.kr/"
                isExternal
                display="inline"
                textDecoration="none"
                letterSpacing="normal"
                fontWeight="normal"
                color="inherit"
                _hover={{ textDecoration: 'none', color: 'inherit' }}
              >
                Interdisciplinary Program in Artificial Intelligence
              </Link>
              .
            </p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ base: 0, md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w={{ base: '120px', md: '150px' }}
              h={{ base: '120px', md: '150px' }}
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ChakraImage
                src="/images/chungwoo.jpg"
                alt="Profile image"
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            About me
          </Heading>
          <Paragraph>
            I am a Master’s student in the{' '}
            <Link
              href="https://gsai.snu.ac.kr/"
              isExternal
              display="inline"
              textDecoration="none"
              letterSpacing="normal"
              fontWeight="normal"
              _hover={{
                textDecoration: 'underline',
                color: 'teal.300',
              }}
            >
              Interdisciplinary Program in Artificial Intelligence at Seoul National University
            </Link>
            , advised by{' '}
            <Link
              href="https://bi.snu.ac.kr/"
              isExternal
              display="inline"
              textDecoration="none"
              letterSpacing="normal"
              fontWeight="normal"
              _hover={{
                textDecoration: 'underline',
                color: 'teal.300',
              }}
            >
              Prof. Byung-Tak Zhang
            </Link>
            , and a Research Intern at{' '}
            <Link
              href="https://tommoro.ai/"
              isExternal
              display="inline"
              textDecoration="none"
              letterSpacing="normal"
              fontWeight="normal"
              _hover={{
                textDecoration: 'underline',
                color: 'teal.300',
              }}
            >
              Tommorro Robotics
            </Link>
            . I received my B.S. in{' '}
            <Link
              href="https://ae.hanyang.ac.kr/%ED%99%88"
              isExternal
              display="inline"
              textDecoration="none"
              letterSpacing="normal"
              fontWeight="normal"
              _hover={{
                textDecoration: 'underline',
                color: 'teal.300',
              }}
            >
              Automotive Engineering from Hanyang University
            </Link>
            .
            <br />
            My research interests lie in Vision-Language-Action (VLA) and Vision-and-Language Navigation (VLN), with a focus on developing spatial perception capabilities for intelligent agents that can effectively perceive and interact with dynamic real-world environments.
          </Paragraph>
          <Box align="center" my={4}>
            <Button
              as={NextLink}
              href="/publications"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              Publications
            </Button>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            News
          </Heading>
          <BioSection>
            <BioYear>2026</BioYear>
            <Box pl={4}>
              <VStack align="start" spacing={1}>
                <Text>
                  Admitted to the M.S. program, Interdisciplinary Program in Artificial Intelligence, Seoul National University.
                </Text>
              </VStack>
            </Box>
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading
            as="h3"
            variant="section-subtitle"
            fontSize="lg"
            fontWeight="normal"
            cursor="pointer"
            onClick={() => setShowOldNews(!showOldNews)}
            display="flex"
            alignItems="center"
            gap={2}
          >
            Old News
            {showOldNews ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Heading>
          <Collapse in={showOldNews} animateOpacity>
            <BioSection>
              <BioYear>2025</BioYear>
              <Box pl={4}>
                <VStack align="start" spacing={1}>
                  <Text>
                    Started as a Research Assistant at Seoul National University AI Institute in June 2025.
                  </Text>
                  <Text>
                    Currently working as a Research Intern at Tomorrow Robotics since June 2025.
                  </Text>
                  <Text>
                    Graduated in February 2025 with a B.S. in Automotive Engineering from Hanyang University.
                  </Text>
                </VStack>
              </Box>
            </BioSection>
          </Collapse>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Info
          </Heading>

          <List>
            <ListItem>
              <Button
                as={Link}
                href="https://github.com/lcwoo"
                isExternal
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                GitHub
              </Button>
            </ListItem>

            <ListItem>
              <Button
                as={Link}
                href="mailto:canwooj@gmail.com"
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoMailUnread />}
              >
                E-mail
              </Button>
            </ListItem>

            <ListItem>
              <Button
                as={Link}
                href="https://www.linkedin.com/in/chungwoo-lee"
                isExternal
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoLinkedin />}
              >
                LinkedIn
              </Button>
            </ListItem>
          </List>
        </Section>


        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Education
          </Heading>
          <BioSection>
            <BioYear>2025</BioYear>
            B.S., Hanyang University, Dept. of Automotive Engineering
          </BioSection>
          <BioSection>
            <BioYear>2019</BioYear>
            Boin High School
          </BioSection>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Experience
          </Heading>
          <BioSection>
            <BioYear>2026.03 – Present</BioYear>
            M.S. Student, Interdisciplinary Program in Artificial Intelligence at Seoul National University
          </BioSection>

          <BioSection>
            <BioYear>2025.06 – 2026.02</BioYear>
            Research Intern, Interdisciplinary Program in Artificial Intelligence at Seoul National University
          </BioSection>

          <BioSection>
            <BioYear>2025.06 – 2026.01</BioYear>
            Research Intern, Tomorrow Robotics
          </BioSection>

          <BioSection>
            <BioYear>2023.08 – 2024.10</BioYear>
            Undergraduate Researcher, Intelligent Robotics & Computer Vision Lab
          </BioSection>

          <BioSection>
            <BioYear>2020.07 – 2022.01</BioYear>
            Sergeant (Optical/Guard Equipment Maintenance), ROK Army Logistics Command
          </BioSection>
        </Section>

        <Box align="center" h="5em" />

        <Box align="center" my={10} w="100%">
          <Box
            id="map-area"
            sx={{
              width: '100%',
              maxW: { base: '100%', md: '800px' },
              mx: 'auto',
              minHeight: '300px',
            }}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
export { getStaticProps } from '../components/chakra';
