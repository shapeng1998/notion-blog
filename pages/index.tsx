import type { GetStaticProps, NextPage } from 'next';
import { postsPerPage } from 'blog.config';
import BlogPost from 'components/blog-post';
import Container from 'components/container';
import { getAllPosts } from 'lib/get-all-posts';
import type { PageProperties } from 'lib/types';

// import debugConstants from 'debug';

interface HomeProps {
  page: number;
  postsToShow: PageProperties[];
  showNextPage: boolean;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // const allPosts = debugConstants.allPosts;
  const allPosts = await getAllPosts();

  const postsToShow = allPosts.slice(0, postsPerPage);
  const showNextPage = allPosts.length > postsPerPage;

  const INITIAL_PAGE = 1; // current page
  const REVALIDATE_TIME = 10; // 10 seconds

  return {
    props: {
      page: INITIAL_PAGE,
      postsToShow,
      showNextPage,
    },
    revalidate: REVALIDATE_TIME,
  };
};

const Home: NextPage<HomeProps> = ({ page, postsToShow, showNextPage }) => {
  return (
    <Container>
      <div className="space-y-6 md:space-y-8">
        {postsToShow.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
