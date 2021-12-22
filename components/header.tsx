import { useLocale } from 'lib/locale';
import { showAbout, title, description } from 'blog.config';
import Link from 'next/link';

interface HeaderProps {
  headerTitle?: string;
}

const Header = ({ headerTitle }: HeaderProps) => {
  return (
    <>
      {/* observer element */}
      <div className="h-4 md:h-12"></div>

      <header className="sticky top-0 z-10 backdrop-blur-sm transition-all m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 max-w-3xl px-4">
        <HeaderTitle headerTitle={headerTitle} />
        <NavBar />
      </header>
    </>
  );
};

const HeaderTitle = ({ headerTitle }: HeaderProps) => (
  <div className="flex items-center space-x-2">
    <Link href="/">
      <a aria-label={title}>
        <div className="h-6">
          <HeaderSvg />
        </div>
      </a>
    </Link>
    {/* TODO: scroll effects */}
    <p className="hidden md:font-medium">
      {headerTitle ? (
        headerTitle
      ) : (
        <>
          {title}, <span className="font-normal">{description}</span>
        </>
      )}
    </p>
  </div>
);

const NavBar = () => {
  const locale = useLocale();
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true },
  ];

  return (
    <nav className="flex-shrink-0">
      <ul className="flex flex-row space-x-4">
        {links.map(
          ({ id, name, to, show }) =>
            show && (
              <li
                key={id}
                className="block text-gray-900 dark:text-gray-500 leading-6"
              >
                <Link href={to}>
                  <a>{name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

const HeaderSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="24"
        height="24"
        className="fill-current text-black dark:text-white"
      />
      <rect width="24" height="24" fill="url(#paint0_radial)" />
      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45) scale(39.598)"
        >
          <stop stopColor="#CFCFCF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#E9E9E9" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Header;
