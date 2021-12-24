import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { postsPerPage } from 'blog.config';
import type { ParsedUrlQuery } from 'querystring';
import type { HomeProps } from 'pages/index';
import { getAllPosts } from 'lib/get-all-posts';
import { REVALIDATE_TIME } from 'lib/constants';
import Container from 'components/container';
import BlogPost from 'components/blog-post';
import Pagination from 'components/pagination';

interface PostListPageProps extends HomeProps {}

interface PostListPageParams extends ParsedUrlQuery {
  num: string;
}

const PostListPage: NextPage<PostListPageProps> = ({
  pageNumber,
  postsToShow,
  showNextPage,
}) => {
  return (
    <Container>
      {postsToShow && postsToShow.length > 0 && (
        <div className="space-y-6 md:space-y-8">
          {postsToShow.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
          <Pagination pageNumber={pageNumber} showNextPage={showNextPage} />
        </div>
      )}
    </Container>
  );
};

export const getStaticProps: GetStaticProps<
  PostListPageProps,
  PostListPageParams
> = async (context) => {
  if (!context.params) {
    throw new Error('No params');
  }
  const pageNumber = +context.params.num;

  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(
    postsPerPage * (pageNumber - 1),
    postsPerPage * pageNumber
  );

  const showNextPage = pageNumber * postsPerPage < posts.length;

  // invalid page number
  if (!postsToShow || !postsToShow.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageNumber,
      postsToShow,
      showNextPage,
    },
    revalidate: REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths<PostListPageParams> = async () => {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return {
    paths: Array.from({ length: totalPages }, (_, i) => ({
      params: {
        num: String(i + 1),
      },
    })),
    fallback: 'blocking',
  };
};

export default PostListPage;
