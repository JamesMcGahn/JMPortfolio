import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            itemProp="description"
            content="James McGahn Portfolio"
          />
          <meta
            name="keywords"
            itemProp="keywords"
            content="james mcgahn, developer, mcgahn"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta property="og:image" />
          <meta
            name="google-site-verification"
            content="l5RoOAbWHSGKKacvY4FJGlFQtCuFLbbSiJ8HRLjTG8A"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.jamesmcgahn.com/" />
          <meta property="og:title" content="James McGahn" />
          <meta property="og:description" content="James McGahn" />
          <meta
            property="og:image"
            content="https://www.jamesmcgahn.com/img/jmlogo4.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
