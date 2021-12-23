import type { GetStaticProps, NextPage } from 'next';
import { postsPerPage } from 'blog.config';
import { getAllPosts } from 'lib/get-all-posts';
import type { PageProperties } from 'lib/types';
import { INITIAL_PAGE_NUMBER, REVALIDATE_TIME } from 'lib/constants';
import BlogPost from 'components/blog-post';
import Container from 'components/container';
import Pagination from 'components/pagination';

export interface HomeProps {
  pageNumber: number;
  postsToShow: PageProperties[];
  showNextPage: boolean;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPosts = await getAllPosts();

  const postsToShow = allPosts.slice(0, postsPerPage);
  const showNextPage = allPosts.length > postsPerPage;

  return {
    props: {
      pageNumber: INITIAL_PAGE_NUMBER,
      postsToShow,
      showNextPage,
    },
    revalidate: REVALIDATE_TIME,
  };
};

const Home: NextPage<HomeProps> = ({
  pageNumber,
  postsToShow,
  showNextPage,
}) => {
  return (
    <Container>
      <div className="space-y-6 md:space-y-8">
        {postsToShow.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
        {showNextPage && (
          <Pagination pageNumber={pageNumber} showNextPage={showNextPage} />
        )}
      </div>
    </Container>
  );
};

export default Home;
