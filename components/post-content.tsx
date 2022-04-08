import type { ExtendedRecordMap } from 'notion-types';
import {
  Code,
  Collection,
  CollectionRow,
  Equation,
  NotionRenderer,
} from 'react-notion-x';
import { useChangeTheme } from 'lib/hooks';

interface PostContentProps {
  blockMap: ExtendedRecordMap;
}

const PostContent = ({ blockMap }: PostContentProps) => {
  const { resolvedTheme, mounted } = useChangeTheme();

  return (
    <>
      {mounted && (
        <NotionRenderer
          recordMap={blockMap}
          darkMode={resolvedTheme === 'dark'}
          components={{
            equation: Equation,
            code: Code,
            collection: Collection,
            collectionRow: CollectionRow,
          }}
        />
      )}
    </>
  );
};

export default PostContent;
