import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";

export function useFetchHelper<T>(relativeUrl: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!relativeUrl) return;
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}${relativeUrl}`);
        const data = await res.json();
        setData(data);
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

  return { data, loading, error };
}
