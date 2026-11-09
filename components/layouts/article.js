import { motion, useReducedMotion } from 'framer-motion'
import Head from 'next/head'
import { GridItemStyle } from '../grid-item'

const variants = {
  hidden: { opacity: 0, x: 0, y: 8 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 8 }
}

const Layout = ({ children, title }) => {
  const reducedMotion = useReducedMotion()
  const t = `${title} - Chungwoo Lee`
  return (
    <motion.article
      initial={reducedMotion ? false : 'hidden'}
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
      style={{ position: 'relative' }}
    >
      <>
        {title && (
          <Head>
            <title>{t}</title>
            <meta name="twitter:title" content={t} key="twitter:title" />
            <meta property="og:title" content={t} key="og:title" />
          </Head>
        )}
        {children}

        <GridItemStyle />
      </>
    </motion.article>
  )
}

export default Layout
