import PropertyCard from "./PropertyCard/PropertyCard";
import Status from "../Status/Status";
import "../PropertyGrid/PropertyGrid.css";
// Shows a list of property cards from a useFetch() result.
// While loading it shows grey placeholder cards, so the page keeps its shape.
export default function PropertyGrid({ result, className = "grid", emptyText = "No properties yet." }) {
  const { data, loading, error, reload } = result;
  if (error) return <Status error={error} reload={reload} />;
  if (loading) return <div className={className}>{[1, 2, 3].map((n) => <div key={n} className="card skeleton" />)}</div>;
  if (!data.length) return <p>{emptyText}</p>;
  return <div className={className}>{data.map((p) => <PropertyCard key={p.id} p={p} />)}</div>;
}