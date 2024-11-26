import * as React from 'react';

export default function useDemoRouter(basePath: string) {
  const [pathname, setPathname] = React.useState<string | null>(null);
  const [searchParams, setSearchParams] = React.useState<URLSearchParams | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  const navigate = (path: string | URL) => {
    if (typeof window !== 'undefined') {
      if (typeof path === 'string') {
        window.history.pushState({}, '', path);
      } else {
        window.history.pushState({}, '', path.toString());
      }
      setPathname(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    }
  };

  return {
    pathname,
    searchParams,
    navigate,
    basePath, // Add basePath
    components: {}, // Add components (dummy object for example)
    sdc: {}, // Add sdc (dummy object for example)
    sbc: {}, // Add sbc (dummy object for example)
    // Add other required properties here
  };
}