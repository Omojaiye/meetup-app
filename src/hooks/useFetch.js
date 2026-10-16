import { useCallback, useEffect, useState } from "react";

// Runs an API function and gives you { data, loading, error, reload }.
// Example: const { data, loading } = useFetch(() => getProperties({ hot: true }), []);
// The second argument is the list of values that should trigger a new request.
export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    fn().then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, reload: load };
}
