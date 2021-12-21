import formatDate from 'lib/format-date';
import type { PageProperties } from 'lib/types';
import Link from 'next/link';

interface BlogPostProps {
  post: PageProperties;
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div>
      <Link href={`/${post.slug}`}>
        <a>
          <article>
            <header className="flex flex-col justify-between md:flex-row md:items-baseline">
              <h2 className="text-lg md:text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
                {post.title}
              </h2>
              <time className="flex-shrink-0 text-zinc-600 dark:text-gray-400">
                {formatDate(post.date?.start_date || post.createdTime)}
              </time>
            </header>
            <main>
              <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
                {post.summary}
              </p>
            </main>
          </article>
        </a>
      </Link>
    </div>
  );
};

export default BlogPost;
