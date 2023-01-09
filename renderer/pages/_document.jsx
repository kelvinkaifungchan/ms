import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval';" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}