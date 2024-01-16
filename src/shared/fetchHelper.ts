import { useContext, useEffect, useState } from "react";
import { getAPIUrl } from "../config/constants";
import { CachedFetchContext } from "./context/CachedFetchContext";

const CACHE_DATA_WAIT_TIME = 200;

type FetchOptions = {
  useGlobalCache: boolean;
};

// TODO: Add support for POST, PUT, DELETE
// TODO: Add support for custom keys

export function useFetchData<T>(
  relativeUrl: string,
  options: FetchOptions = { useGlobalCache: true }
) {
  const { useGlobalCache } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    cachedData: globalCache,
    updateCachedData,
    clearAllCachedData,
  } = useContext(CachedFetchContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!relativeUrl) {
        setLoading(false);
        return;
      }
      // Simply retrieve data from cache if it exists
      if (useGlobalCache && globalCache[relativeUrl]) {
        setLoading(true);
        // Wait for a bit to show loading state
        await new Promise((resolve) =>
          setTimeout(resolve, CACHE_DATA_WAIT_TIME)
        );
        setData(globalCache[relativeUrl] as T | null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`${getAPIUrl()}${relativeUrl}`);
        const data = await res.json();
        setData(data);
        updateCachedData(relativeUrl, data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relativeUrl]);

  const invalidateCache = (url: string) => {
    updateCachedData(url, null);
  };

  return {
    data,
    loading,
    error,
    invalidateCache,
    clearAllCachedData,
  };
}
