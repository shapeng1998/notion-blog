import { useRouter } from 'next/router';
import { useLocale } from 'lib/locale';

const PostFooter = () => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="mt-2 flex justify-between font-medium text-gray-500 dark:text-gray-400">
      <a>
        <button
          onClick={() => router.push('/')}
          className="hover:text-black dark:hover:text-gray-100"
        >
          ← {locale.POST.BACK}
        </button>
      </a>
      <a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-black dark:hover:text-gray-100"
        >
          ↑ {locale.POST.TOP}
        </button>
      </a>
    </div>
  );
};

export default PostFooter;
