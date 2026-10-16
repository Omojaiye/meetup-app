import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProperty, getCategories, getMessages, getProperties } from "../../api";
import useFetch from "../../hooks/useFetch";
import { formatPrice } from "../../utils/format";
import Img from "../../components/Img/Img";
import Status from "../../components/Status/Status";
import "./Dashboard.css";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const categories = useFetch(() => getCategories(), []);
  const messages = useFetch(() => getMessages(), []); // used only for the unread badge
  const list = useFetch(() => getProperties({ category }), [category]); // GET /api/properties?category=
  const unread = messages.data?.filter((m) => !m.read).length || 0;

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await deleteProperty(p.id); // BACKEND: DELETE /api/properties/:id (admin only)
    list.reload();
  };

  return (
    <section className="section">
      <div className="admin-head">
        <h1>Admin dashboard</h1>
        <div className="admin-links">
          <Link to="/admin/messages" className="btn-outline">Messages {unread > 0 && <span className="badge">{unread}</span>}</Link>
          <Link to="/admin/new" className="btn">+ New listing</Link>
        </div>
      </div>

      <select className="cat-filter" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        {categories.data?.map((c) => <option key={c.name}>{c.name}</option>)}
      </select>

      <Status loading={list.loading} error={list.error} reload={list.reload} />
      {list.data && list.data.length === 0 && <p>No listings in this category yet. Click "New listing" to add one.</p>}
      {list.data && list.data.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Photo</th><th>Title</th><th>Category</th><th>Price</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {list.data.map((p) => (
                <tr key={p.id}>
                  <td><Img src={p.images?.[0]} /></td>
                  <td>{p.title}<br /><small className="muted">{p.location}</small></td>
                  <td>{p.category}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td className="row-actions">
                    <Link to={`/admin/edit/${p.id}`} className="btn-outline">Edit</Link>
                    <button className="btn btn-danger" onClick={() => remove(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
