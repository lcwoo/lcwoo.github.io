import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts } from '../../lib/posts'
import { Container, Heading, Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import NextImage from 'next/image'
import PdfViewer from '../../components/PdfViewer'
import HighlightText from '../../components/HighlightText'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const components = {
  // Headings
  h1: (props: any) => <Heading as="h1" size="2xl" my={6} {...props} />,
  h2: (props: any) => <Heading as="h2" size="xl" my={5} {...props} />,
  h3: (props: any) => <Heading as="h3" size="lg" my={4} {...props} />,
  h4: (props: any) => <Heading as="h4" size="md" my={3} {...props} />,

  // Text
  p: (props: any) => <Text as="p" fontSize="md" my={3} lineHeight="tall" {...props} />,
  blockquote: (props: any) => (
    <Box
      as="blockquote"
      pl={4}
      borderLeft="4px solid #CBD5E0"
      color="gray.600"
      fontStyle="italic"
      my={4}
      {...props}
    />
  ),

  // Lists
  ul: (props: any) => <Box as="ul" pl={5} style={{ listStyle: 'disc' }} {...props} />,
  ol: (props: any) => <Box as="ol" pl={5} style={{ listStyle: 'decimal' }} {...props} />,
  li: (props: any) => <Box as="li" mb={2} {...props} />,

  // Tables
  table: (props: any) => <Table variant="simple" my={6} {...props} />,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,


  img: (props: any) => {
    const src = props.src?.startsWith('http') ? props.src : `${props.src}`
    return (
      <NextImage
        {...props}
        src={src}
        width={props.width ? parseInt(props.width) : 800}
        height={props.height ? parseInt(props.height) : 450}
        alt={props.alt || ''}
      />
    )
  },
  Image: (props: any) => {
    const src = props.src?.startsWith('http') ? props.src : `${props.src}`
    return (
      <NextImage
        {...props}
        src={src}
        width={props.width ? parseInt(props.width) : 800}
        height={props.height ? parseInt(props.height) : 450}
        alt={props.alt || ''}
      />
    )
  },

  PdfViewer,
  Box,
  HighlightText,
  Flex,
  Text
}


type BlogPostProps = {
  source: MDXRemoteSerializeResult
  frontMatter: {
    title: string
    date: string
    summary?: string
  }
}

const POSTS_PATH = path.join(process.cwd(), 'devlog')

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts()
  return {
    paths: posts.map(post => ({
      params: { slugs: post.slug.split('/').filter(Boolean) }
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugs = (params?.slugs as string[]) || []
  const filePath = path.join(POSTS_PATH, ...slugs) + '.mdx'
  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath, remarkGfm],
      rehypePlugins: [rehypeKatex,rehypePrism],
    },
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export default function BlogPost({ source, frontMatter }: BlogPostProps) {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="2xl" mb={2}>{frontMatter.title}</Heading>
      <Text mb={6} color="gray.500">{frontMatter.date}</Text>
      <MDXRemote {...source} components={components} />
      <Box display="flex" justifyContent="center" mt={10}>
        <Button as={NextLink} href="/devlog" colorScheme="teal">
          Return to dev log
        </Button>
      </Box>
    </Container>
  )
}
