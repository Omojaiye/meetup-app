import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProperties } from "../../api";
import useFetch from "../../hooks/useFetch";
import PropertyGrid from "../../components/PropertyGrid/PropertyGrid";
import "./Properties.css";

export default function Properties() {
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "");
  const [text, setText] = useState("");   // what the user is typing
  const [search, setSearch] = useState(""); // what we send to the backend

  const categories = useFetch(() => getCategories(), []);
  // GET /api/properties?category=...&search=...  (runs again when category or search changes)
  const result = useFetch(() => getProperties({ category, search }), [category, search]);

  const submit = (e) => { e.preventDefault(); setSearch(text); };

  return (
    <section className="section">
      <h2>All properties</h2>
      <form className="filters" onSubmit={submit}>
        <input placeholder="Search by name or location" value={text} onChange={(e) => setText(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.data?.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <button className="btn">Search</button>
      </form>
      <PropertyGrid result={result} emptyText="No properties match your search. Try a different word." />
    </section>
  );
}
