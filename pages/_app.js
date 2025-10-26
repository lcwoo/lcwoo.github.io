import 'katex/dist/katex.min.css'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import Payhip from '../components/payhip'
import { GoogleAnalytics } from '@next/third-parties/google'
import 'prism-themes/themes/prism-vsc-dark-plus.css'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Payhip />
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        <GoogleAnalytics gaId="G-8GCDT7XERR" />
      </Layout>
    </Chakra>
  )
}

Website.getInitialProps = async ({ ctx }) => {
  return {
    pageProps: {
      cookies: ctx.req?.headers.cookie ?? ''
    }
  }
}

export default Website