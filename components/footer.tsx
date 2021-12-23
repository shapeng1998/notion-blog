import PoweredByVercel from 'powered-by-vercel';
import { author, since } from 'blog.config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all max-w-2xl px-4">
      <hr className="border-gray-200 dark:border-gray-600" />
      <div className="my-4 text-sm leading-6 flex justify-between flex-wrap align-baseline">
        <p>
          &copy; {author}{' '}
          {currentYear === since ? currentYear : `${since} - ${currentYear}`}
        </p>
        <PoweredByVercel
          svgProps={{ width: 135, height: 28 }}
          utmSource="shapeng1998"
        />
      </div>
    </footer>
  );
};

export default Footer;
