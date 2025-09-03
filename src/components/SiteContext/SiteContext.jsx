import { createContext, useContext, useState } from "react";

const SiteContext = createContext();

export function SiteContextProvider({ children }) {
  const [options, setOptions] = useState(false)
  const [articles, setArticles] = useState([]);

  return (
    <SiteContext.Provider value={{ options, setOptions, articles, setArticles }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  return useContext(SiteContext);
}
