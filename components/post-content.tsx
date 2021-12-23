import { ExtendedRecordMap } from 'notion-types';
import {
  NotionRenderer,
  Equation,
  Code,
  Collection,
  CollectionRow,
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
