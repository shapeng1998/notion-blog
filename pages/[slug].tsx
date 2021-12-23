import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { email } from 'blog.config';
import { createHash } from 'crypto';
import type { ParsedUrlQuery } from 'querystring';
import type { ExtendedRecordMap } from 'notion-types';
import type { PageProperties } from 'lib/types';
import { getAllPosts } from 'lib/get-all-posts';
import { REVALIDATE_TIME } from 'lib/constants';
import { getNotionRecordMap } from 'lib/get-notion-record-map';
import Container from 'components/container';
import PostContent from 'components/post-content';
import PostFooter from 'components/post-footer';
import PostHeading from 'components/post-heading';

interface BlogPageProps {
  post: PageProperties;
  blockMap: ExtendedRecordMap;
  hashedEmail: string;
}

interface BlogPageParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPage: NextPage<BlogPageProps> = ({ post, blockMap, hashedEmail }) => {
  return (
    <>
      {post && (
        <Container
          layout="blog"
          title={post.title}
          description={post.summary}
          type="article"
        >
          <article>
            <PostHeading post={post} hashedEmail={hashedEmail} />
            <PostContent blockMap={blockMap} />
          </article>
          <PostFooter />
        </Container>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<
  BlogPageProps,
  BlogPageParams
> = async (context) => {
  if (!context.params) {
    throw new Error('No params');
  }
  const slug = context.params.slug;

  const allPosts = await getAllPosts({ includePages: true });
  const post = allPosts.find((p) => p.slug === slug);

  // invalid slug
  if (!post) {
    return {
      notFound: true,
    };
  }

  const blockMap = await getNotionRecordMap(post.id);
  const hashedEmail = createHash('md5').update(email).digest('hex');

  return {
    props: {
      post,
      blockMap,
      hashedEmail,
    },
    revalidate: REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts({ includePages: true });
  return {
    paths: allPosts.map(({ slug }) => `/${slug}`),
    fallback: 'blocking',
  };
};

export default BlogPage;
