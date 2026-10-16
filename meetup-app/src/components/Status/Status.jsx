import "./Status.css";

// Shows "Loading..." or an error with a retry button. Shows nothing when all is fine.
export default function Status({ loading, error, reload }) {
  if (loading) return <p className="status">Loading…</p>;
  if (error) return (
    <p className="error">
      {error} {reload && <button className="btn-outline retry" onClick={reload}>Try again</button>}
    </p>
  );
  return null;
}