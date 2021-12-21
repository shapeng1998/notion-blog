import { notionPageId, sortByDate } from 'blog.config';
import { idToUuid } from 'notion-utils';
import { filterPublishedPosts } from './filter-published-posts';
import { getAllPageIds } from './get-all-page-ids';
import { notion } from './get-notion-api';
import { getPageProperties } from './get-page-properties';
import type { PageProperties } from './types';

/**
 * Return all posts' property stuff from Notion API.
 */
export async function getAllPosts({
  includePages = false,
}: { includePages?: boolean } = {}): Promise<PageProperties[]> {
  const recordMap = await notion.getPage(notionPageId);

  // handle not database errors
  const notionPageUuid = idToUuid(notionPageId);
  const rawMetaData = recordMap.block[notionPageUuid].value;
  if (
    rawMetaData.type !== 'collection_view_page' &&
    rawMetaData.type !== 'collection_view'
  ) {
    throw new Error('Notion page is not a database!');
  }

  // get schema and all page ids
  const schema = Object.values(recordMap.collection)[0].value.schema;
  const allPageIds = getAllPageIds(recordMap.collection_query);

  // get all filtered page properties
  const postsData: PageProperties[] = [];
  for (const pageId of allPageIds) {
    const properties = getPageProperties(pageId, recordMap.block, schema);
    postsData.push(properties);
  }
  const posts = filterPublishedPosts({ posts: postsData, includePages });

  // sort posts by date
  if (sortByDate) {
    posts.sort((a, b) => {
      const aDate = new Date(a.date?.start_date || a.createdTime);
      const bDate = new Date(b.date?.start_date || b.createdTime);
      return aDate < bDate ? 1 : -1;
    });
  }

  return posts;
}
