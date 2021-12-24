import type { PageProperties } from './types';

export function getAllTags(posts: PageProperties[]) {
  const taggedPosts = posts.filter((post) => post.tags !== undefined);
  const allTags = taggedPosts.map((post) => post.tags!).flat();

  const res: Record<string, number> = {};
  allTags.forEach(
    (tag) => (res[tag] = res[tag] === undefined ? 1 : res[tag] + 1)
  );
  return res;
}
