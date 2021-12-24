import SearchLayout from 'components/search-layout';
import { REVALIDATE_TIME } from 'lib/constants';
import { getAllPosts } from 'lib/get-all-posts';
import { getAllTags } from 'lib/get-all-tags';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { SearchPageProps } from 'pages/search';
import type { ParsedUrlQuery } from 'querystring';

interface TagPageProps extends SearchPageProps {
  currentTag: string;
}

interface TagPageParams extends ParsedUrlQuery {
  tag: string;
}

const TagPage: NextPage<TagPageProps> = ({ posts, tags, currentTag }) => {
  return <SearchLayout posts={posts} tags={tags} currentTag={currentTag} />;
};

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async (context) => {
  if (!context.params) {
    throw new Error('No params');
  }
  const currentTag = context.params.tag;

  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTags(posts);
  const filteredPosts = posts.filter(
    (post) => post.tags && post.tags.includes(currentTag)
  );

  // invalid tag
  if (!filteredPosts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentTag,
      posts: filteredPosts,
      tags,
    },
    revalidate: REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths<TagPageParams> = async () => {
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ params: { tag } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default TagPage;
