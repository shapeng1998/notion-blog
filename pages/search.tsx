import type { GetStaticProps, NextPage } from 'next';
import { getAllPosts } from 'lib/get-all-posts';
import { getAllTags } from 'lib/get-all-tags';
import type { PageProperties } from 'lib/types';
import SearchLayout from 'components/search-layout';
import { REVALIDATE_TIME } from 'lib/constants';

export interface SearchPageProps {
  tags: Record<string, number>;
  posts: PageProperties[];
}

const SearchPage: NextPage<SearchPageProps> = ({ tags, posts }) => {
  return <SearchLayout tags={tags} posts={posts} />;
};

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
  const allPosts = await getAllPosts({ includePages: false });
  const tags = getAllTags(allPosts);

  return {
    props: {
      tags,
      posts: allPosts,
    },
    revalidate: REVALIDATE_TIME,
  };
};

export default SearchPage;
