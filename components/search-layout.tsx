import { useState } from 'react';
import Link from 'next/link';
import { Search } from '@icon-park/react';
import cn from 'classnames';
import Container from './container';
import BlogPost from './blog-post';
import type { SearchPageProps } from 'pages/search';

interface SearchLayoutProps extends SearchPageProps {
  currentTag?: string;
}

const SearchLayout = ({ posts, tags, currentTag }: SearchLayoutProps) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = getFilteredPosts(searchValue);

  function getFilteredPosts(value: string) {
    if (!posts) return [];

    return posts.filter((post) => {
      const postTags = post.tags ? post.tags.join(' ') : '';
      const searchContent = `${post.title} ${postTags} ${post.summary}`;
      return searchContent.toLowerCase().includes(value.toLowerCase());
    });
  }

  return (
    <Container>
      <div className="relative">
        <input
          type="text"
          placeholder={
            currentTag ? `Search in #${currentTag}` : 'Search Articles'
          }
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-12 px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white dark:focus:bg-gray-800 dark:focus:border-gray-600 dark:focus:shadow-outline"
        />
        <Search
          theme="outline"
          size="24"
          className="absolute text-gray-400 dark:text-gray-500 top-3 right-3"
        />
      </div>
      <Tags tags={tags} currentTag={currentTag} />
      <div className="my-6 md:my-8 space-y-6">
        {!filteredPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">No Posts Found.</p>
        )}
        {filteredPosts.slice(0, 20).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

const Tags = ({
  tags,
  currentTag,
}: {
  tags: Record<string, number>;
  currentTag?: string;
}) => {
  return (
    <ul className="flex flex-row space-x-2 max-w-full overflow-x-auto text-sm">
      {Object.keys(tags).map((key) => {
        const selected = currentTag === key;
        return (
          <li
            key={key}
            className={cn(
              'rounded-md transition-all text-gray-500 bg-gray-200 dark:bg-gray-800 my-2 hover:bg-gray-300 dark:hover:bg-gray-700',
              {
                'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-800 dark:border-gray-300':
                  selected,
              }
            )}
          >
            <Link href={`/tag/${encodeURIComponent(key)}`}>
              <a className="block px-4 py-1 w-max">{`${key} (${tags[key]})`}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchLayout;
