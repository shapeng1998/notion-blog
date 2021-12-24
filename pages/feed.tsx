import type { GetServerSideProps, NextPage } from 'next';
import { generateRss } from 'lib/rss';
import { getAllPosts } from 'lib/get-all-posts';

const FeedPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPosts = await getAllPosts({ includePages: false });
  const latestPosts = allPosts.slice(0, 10);

  res.setHeader('Content-Type', 'text/xml');
  res.write(generateRss(latestPosts));
  res.end();

  return {
    props: {},
  };
};

export default FeedPage;
