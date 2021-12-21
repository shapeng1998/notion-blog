import type { PageProperties } from './types';

const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(current.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

/**
 * Return filtered posts that are published.
 */
export function filterPublishedPosts({
  posts,
  includePages,
}: {
  posts: PageProperties[];
  includePages: boolean;
}): PageProperties[] {
  if (!posts.length) {
    return [];
  }

  const publishedPosts = posts
    .filter((post) => {
      return includePages
        ? post.type === 'Page' || post.type === 'Post'
        : post.type === 'Post';
    })
    .filter((post) => {
      const postDate = new Date(post.date?.start_date || post.createdTime);
      return (
        post.title &&
        post.slug &&
        post.status === 'Published' &&
        postDate < tomorrow
      );
    });

  return publishedPosts;
}
