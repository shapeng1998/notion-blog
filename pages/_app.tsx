// global styles shared across the entire site
import 'styles/globals.css';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-okaidia.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

// here we're bringing in any languages we want to support for
// syntax highlighting via Notion's Code block
import 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

import type { AppProps } from 'next/app';

// TODO: add a language provider to the app
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
