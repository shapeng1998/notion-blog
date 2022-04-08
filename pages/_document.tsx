import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import { lang } from 'blog.config';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={lang}>
        <Head />
        <body className="bg-day dark:bg-night transition-all">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
