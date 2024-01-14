import { ReactNode, createContext, useState } from "react";

type CacheObject = {
  [key: string]: any | null;
};

type CachedFetchContextType = {
  cachedData: { [key: string]: any | null };
  updateCachedData: (key: string, data: any | null) => void;
  clearAllCachedData: () => void;
};

export const CachedFetchContext = createContext<CachedFetchContextType>({
  cachedData: {},
  updateCachedData() {},
  clearAllCachedData() {},
});

export const CachedFetchProvider = ({ children }: { children: ReactNode }) => {
  const [cachedData, setCachedData] = useState<CacheObject>({});

  const updateCachedData = (key: string, data: any | null) => {
    setCachedData((prev) => ({ ...prev, [key]: data }));
  };

  const clearAllCachedData = () => {
    setCachedData({});
  };

  const value = { cachedData, updateCachedData, clearAllCachedData };
  return (
    <CachedFetchContext.Provider value={value}>
      {children}
    </CachedFetchContext.Provider>
  );
};
