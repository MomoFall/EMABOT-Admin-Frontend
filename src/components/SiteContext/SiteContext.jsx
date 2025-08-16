import { createContext, useContext, useState } from "react";

const SiteContext = createContext();

function SiteContextProvider({ children }) {
  const [options, setOptions] = useState(false)

  return (
    <SiteContext.Provider value={{ options, setOptions }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  return useContext(SiteContextProvider);
}
