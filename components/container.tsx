import { PropsWithChildren } from 'react';
import Head from 'next/head';
import {
  title,
  description,
  seo,
  lang,
  link,
  ogImageGenerateURL,
  author,
} from 'blog.config';
import Footer from './footer';
import Header from './header';
import type { CustomMeta } from 'lib/types';

interface ContainerProps extends PropsWithChildren<CustomMeta> {
  layout?: string;
}

const Container = ({ layout, children, ...customMeta }: ContainerProps) => {
  const imgTitle = `${ogImageGenerateURL}/${encodeURIComponent(title)}`;
  const meta = {
    title,
    author,
    description,
    lang,
    keywords: seo.keywords.join(', '),
    type: 'website',
    url: link,
    imgUrl: `${imgTitle}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`,
    ...customMeta,
  };

  return (
    <>
      <Head>
        {/* basic metadata */}
        <title>{meta.title}</title>
        <meta charSet="UTF-8" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />

        {/* open graph metadata */}
        <meta property="og:locale" content={meta.lang} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:image" content={meta.imgUrl} />
        <meta
          property="og:url"
          content={meta.slug ? `${meta.url}/${meta.slug}` : meta.url}
        />

        {/* twitter metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:image" content={meta.imgUrl} />
        {meta.type === 'article' && (
          <>
            <meta
              property="article:published_time"
              content={meta.date || meta.createdTime}
            />
            <meta property="article:author" content={meta.author} />
          </>
        )}
      </Head>

      {/* page content */}
      <div className="wrapper">
        <Header headerTitle={layout === 'blog' ? meta.title : undefined} />
        <main className="m-auto flex-grow w-full transition-all max-w-2xl px-4">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Container;
