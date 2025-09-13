import { useState, useCallback } from 'react';

const useLoader = (initial = false) => {
  const [loading, setLoading] = useState(initial);

  const start = useCallback(() => setLoading(true), []);
  const stop = useCallback(() => setLoading(false), []);

  return { loading, start, stop };
};
export default useLoader;
