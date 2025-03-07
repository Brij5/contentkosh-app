import { useState, useEffect, useCallback } from 'react';

export const useData = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap the fetch function in useCallback to prevent infinite loops
  const memoizedFetchFunction = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    memoizedFetchFunction();
  }, [memoizedFetchFunction]);

  const refresh = useCallback(() => {
    memoizedFetchFunction();
  }, [memoizedFetchFunction]);

  return { data, loading, error, refresh };
};
