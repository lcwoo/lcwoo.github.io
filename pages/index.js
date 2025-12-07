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
  Image as ChakraImage
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
            <p>Prospective Graduate Student</p>
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
            Hello! I received a Bachelor's degree in{' '}
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
            . I am currently a Research Assistant at the{' '}
            <Link
              href="https://aiis.snu.ac.kr/"
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
              Seoul National University AI Institute
            </Link>{' '}
            and a Research Intern at{' '}
            <Link
              href="https://www.tomorrow-robotics.com/"
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
              Tomorrow Robotics
            </Link>
            .
            <br />
            &nbsp;&nbsp;My research interests focus on Vision-Language-Action (VLA), particularly leveraging computer vision 
            to enable intelligent agents to perceive, understand, and interact with dynamic real-world environments. 
            I am actively exploring these directions and look forward to sharing my future progress.
          </Paragraph>
          <Box align="center" my={4}>
            <Button
              as={NextLink}
              href="/publications"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              publications
            </Button>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            News
          </Heading>
          <BioSection>
            <BioYear>2025</BioYear>
            <Box pl={4}>
              <Text mb={1}>
                Graduated in February 2025 with a B.S. in Automotive Engineering from Hanyang University.
              </Text>
              <Text mb={1}>
                Started as a Research Assistant at Seoul National University AI Institute in June 2025.
              </Text>
              <Text>
                Currently working as a Research Intern at Tomorrow Robotics since June 2025.
              </Text>
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
          >
            Old News
            {showOldNews ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Heading>
          <Collapse in={showOldNews} animateOpacity>
            {/* <BioSection>
              <BioYear>2023.05</BioYear>
              non.
            </BioSection> */}
          </Collapse>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Info
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/lcwoo" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoGithub />}
                >
                  GitHub
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="mailto: canwooj@gmail.com" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoMailUnread />}
                >
                  e-mail
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.linkedin.com/in/chungwoo-lee" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoLogoLinkedin />}
                >
                  LinkedIn
                </Button>
              </Link>
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
            <BioYear>2025.06 – Present</BioYear>
            Research Assistant, Seoul National University AI Institute
          </BioSection>

          <BioSection>
            <BioYear>2025.06 – Present</BioYear>
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

          <BioSection>
            <BioYear>2019.02 – 2020.07</BioYear>
            Autory Automotive Club, Sejong University
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
