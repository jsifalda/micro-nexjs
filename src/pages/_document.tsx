import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    console.log({ initialProps })
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="/fragment.webcomponent.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
