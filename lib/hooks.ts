import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const useChangeTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    mounted,
    resolvedTheme,
    setTheme,
  };
};
