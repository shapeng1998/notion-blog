import Link from 'next/link';
import Image from 'next/image';
import { author, socialLink } from 'blog.config';
import type { PageProperties } from 'lib/types';
import formatDate from 'lib/format-date';

interface PostHeadingProps {
  post: PageProperties;
  hashedEmail: string;
}

const PostHeading = ({ post, hashedEmail }: PostHeadingProps) => {
  return (
    <>
      <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">
        {post.title}
      </h1>
      {post.type === 'Post' && (
        <div className="text-gray-500 dark:text-gray-400">
          <nav className="flex mt-4 mb-2 items-center text-sm">
            <div className="flex items-center">
              <a href={socialLink} className="flex items-center">
                <Image
                  alt={author}
                  width={24}
                  height={24}
                  src={`https://gravatar.com/avatar/${hashedEmail}`}
                  className="rounded-full"
                />
                <p className="ml-2 md:block">{author}</p>
              </a>
              <span className="block">&nbsp;/&nbsp;</span>
            </div>
            <div className="mr-2 md:ml-0">
              {formatDate(post.date?.start_date || post.createdTime)}
            </div>
          </nav>
          {post.tags && (
            <div className="flex space-x-1 flex-nowrap max-w-full overflow-x-auto article-tags">
              {post.tags.map((tag) => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const TagItem = ({ tag }: { tag: string }) => {
  return (
    <Link href={`/tag/${encodeURIComponent(tag)}`}>
      <a>
        <p className="rounded-full px-2 py-1 border leading-none text-xs border-gray-300 dark:border-gray-600">
          {tag}
        </p>
      </a>
    </Link>
  );
};

export default PostHeading;
