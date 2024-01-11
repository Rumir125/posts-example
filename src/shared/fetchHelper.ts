import { useEffect, useState } from "react";
import { getAPIUrl } from "../config/constants";

const CACHE_DATA_WAIT_TIME = 200;

interface CacheInterface<T> {
  [key: string]: T | null;
}
export function useFetchData<T>(relativeUrl: string) {
  const [cachedData, setCachedData] = useState<CacheInterface<T>>({});
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!relativeUrl) {
        setLoading(false);
        return;
      }
      // TODO - implement cache invalidation, create global cache
      // Simply retrieve data from cache if it exists
      if (cachedData[relativeUrl]) {
        setLoading(true);
        // Wait for a bit to show loading state
        await new Promise((resolve) =>
          setTimeout(resolve, CACHE_DATA_WAIT_TIME)
        );
        setData(cachedData[relativeUrl]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`${getAPIUrl()}${relativeUrl}`);
        const data = await res.json();
        setData(data);
        setCachedData((prev) => ({ ...prev, [relativeUrl]: data }));
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [relativeUrl]);

  return { data: cachedData[relativeUrl] || data, loading, error };
}
