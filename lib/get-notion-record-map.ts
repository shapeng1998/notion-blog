import pMemoize from 'p-memoize';
import ExpiryMap from 'expiry-map';
import { NotionAPI } from 'notion-client';
import { CACHE_EXPIRATION_TIME } from './constants';

const notion = new NotionAPI();
const cache = new ExpiryMap(CACHE_EXPIRATION_TIME);

export const getNotionRecordMap = pMemoize(
  async (pageId: string) => {
    const recordMap = await notion.getPage(pageId);
    return recordMap;
  },
  { cache }
);
