import { createContext, PropsWithChildren, useContext } from 'react';
import { fetchLocaleLang } from './lang';

const locale = fetchLocaleLang();
const LocaleContext = createContext<typeof locale>({} as typeof locale);

export const LocaleProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
