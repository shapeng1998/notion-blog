import type { ExtendedRecordMap } from 'notion-types';

/**
 * Return all page ids from a collection query.
 */
export function getAllPageIds(
  collectionQuery: ExtendedRecordMap['collection_query']
) {
  const views = Object.values(collectionQuery)[0];

  const pageIdSet = new Set<string>();
  Object.values(views).forEach((view) => {
    view.blockIds.forEach((blockId) => {
      pageIdSet.add(blockId);
    });
  });

  const pageIds = Array.from(pageIdSet);
  return pageIds;
}
