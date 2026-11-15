"use client";

import { createContext, useContext } from "react";

/** Whether at least one published article exists — computed once in
 * RootLayout (which already fetches articles for Navbar) and read by
 * Footer, which is rendered deep inside many pages (including several
 * Client Components), too far from the server-fetched value to receive
 * it as a plain prop without threading it through every page. */
const HasArticlesContext = createContext(false);

export function ArticlesProvider({
  hasArticles,
  children,
}: {
  hasArticles: boolean;
  children: React.ReactNode;
}) {
  return (
    <HasArticlesContext.Provider value={hasArticles}>
      {children}
    </HasArticlesContext.Provider>
  );
}

export function useHasArticles(): boolean {
  return useContext(HasArticlesContext);
}
