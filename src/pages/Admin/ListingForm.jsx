import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createProperty, getCategories, getProperty, updateProperty } from "../../api";
import useFetch from "../../hooks/useFetch";
import Status from "../../components/Status/Status";
import "./ListingForm.css";

// Loads the listing first (when editing), then shows the form.
export default function ListingForm() {
  const { id } = useParams(); // present only when editing
  // GET /api/properties/:id   (skipped when creating a new listing)
  const result = useFetch(() => (id ? getProperty(id) : Promise.resolve(null)), [id]);

  if (result.loading || result.error) return (
    <section className="section narrow">
      <Link to="/admin">← Back to dashboard</Link>
      <Status loading={result.loading} error={result.error} reload={result.reload} />
    </section>
  );
  return <Form id={id} existing={result.data} />;
}

const EMPTY = {
  title: "", category: "", price: "", location: "", beds: 0, baths: 0, area: "",
  lat: 9.1806, lng: 7.1795, hot: false, description: "", images: "",
};

function Form({ id, existing }) {
  const navigate = useNavigate();
  const categories = useFetch(() => getCategories(), []);
  // The images box holds one URL per line.
  const [form, setForm] = useState(existing ? { ...existing, images: (existing.images || []).join("\n") } : EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const data = {
      title: form.title, category: form.category, location: form.location,
      description: form.description, hot: form.hot,
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      price: Number(form.price), beds: Number(form.beds), baths: Number(form.baths),
      area: Number(form.area), lat: Number(form.lat), lng: Number(form.lng),
    };
    setSaving(true);
    try {
      // BACKEND (admin only): POST /api/properties  or  PUT /api/properties/:id
      if (existing) await updateProperty(id, data); else await createProperty(data);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <section className="section narrow">
      <Link to="/admin">← Back to dashboard</Link>
      <h1>{existing ? "Edit listing" : "New listing"}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>Title<input name="title" value={form.title} required onChange={change} /></label>
        <label>Category
          <select name="category" value={form.category} required onChange={change}>
            <option value="">Choose a category</option>
            {categories.data?.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </label>
        <div className="row">
          <label>Price (₦)<input name="price" type="number" min="0" value={form.price} required onChange={change} /></label>
          <label>Area (sqm)<input name="area" type="number" min="0" value={form.area} required onChange={change} /></label>
        </div>
        <label>Location<input name="location" value={form.location} required onChange={change} /></label>
        <div className="row">
          <label>Bedrooms<input name="beds" type="number" min="0" value={form.beds} onChange={change} /></label>
          <label>Bathrooms<input name="baths" type="number" min="0" value={form.baths} onChange={change} /></label>
        </div>
        <div className="row">
          <label>Map latitude<input name="lat" type="number" step="any" value={form.lat} onChange={change} /></label>
          <label>Map longitude<input name="lng" type="number" step="any" value={form.lng} onChange={change} /></label>
        </div>
        <label>Description<textarea name="description" rows="4" value={form.description} required onChange={change} /></label>
        {/* BACKEND: replace this box with a file upload (multer + Cloudinary/S3) that returns image URLs. */}
        <label>Image URLs (one per line)
          <textarea name="images" rows="4" value={form.images} onChange={change} placeholder="https://..." />
        </label>
        <label className="check"><input name="hot" type="checkbox" checked={form.hot} onChange={change} /> Show in "Hot homes"</label>
        <button className="btn" disabled={saving}>{saving ? "Saving…" : existing ? "Save changes" : "Publish listing"}</button>
      </form>
    </section>
  );
}
