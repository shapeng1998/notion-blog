import { INITIAL_PAGE_NUMBER } from 'lib/constants';
import { useLocale } from 'lib/locale';
import Link from 'next/link';

interface PaginationProps {
  pageNumber: number;
  showNextPage: boolean;
}

const Pagination = ({ pageNumber, showNextPage }: PaginationProps) => {
  const locale = useLocale();

  let justifyContent = 'justify-between';
  if (pageNumber === INITIAL_PAGE_NUMBER && showNextPage) {
    justifyContent = 'justify-end';
  } else if (pageNumber !== INITIAL_PAGE_NUMBER && !showNextPage) {
    justifyContent = 'justify-start';
  }

  return (
    <div
      className={`flex font-medium text-gray-900 dark:text-gray-100 ${justifyContent}`}
    >
      {pageNumber !== INITIAL_PAGE_NUMBER && (
        <Link
          href={
            pageNumber - 1 === INITIAL_PAGE_NUMBER
              ? '/'
              : `/page/${pageNumber - 1}`
          }
        >
          <a rel="prev" className="block">
            ← {locale.PAGINATION.PREV}
          </a>
        </Link>
      )}
      {showNextPage && (
        <Link href={`/page/${pageNumber + 1}`}>
          <a rel="next" className="block">
            {locale.PAGINATION.NEXT} →
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
