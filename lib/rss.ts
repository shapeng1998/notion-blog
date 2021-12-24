import { Feed } from 'feed';
import { PageProperties } from './types';
import { title, description, link, author, lang, email } from 'blog.config';

export function generateRss(posts: PageProperties[]) {
  const currentYear = new Date().getFullYear();

  const feed = new Feed({
    title,
    description,
    id: link,
    copyright: `All rights reserved ${currentYear}, ${author}`,
    favicon: `${link}/favicon.ico`,
    language: lang,
    author: {
      name: author,
      email,
      link,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title as string,
      id: `${link}/${post.slug}`,
      link: `${link}/${post.slug}`,
      description: post.summary as string,
      date: new Date(post.date?.start_date || post.createdTime),
    });
  });

  return feed.rss2();
}
