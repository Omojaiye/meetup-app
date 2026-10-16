import { Link } from "react-router-dom";
import { deleteMessage, getMessages, markMessageRead } from "../../api";
import useFetch from "../../hooks/useFetch";
import { formatPrice } from "../../utils/format";
import Status from "../../components/Status/Status";
import "./Messages.css";

export default function Messages() {
  const { data, loading, error, reload } = useFetch(() => getMessages(), []); // GET /api/messages (admin only)

  const read = async (id) => { await markMessageRead(id); reload(); };   // PATCH /api/messages/:id/read
  const remove = async (id) => { await deleteMessage(id); reload(); };   // DELETE /api/messages/:id

  return (
    <section className="section">
      <Link to="/admin">← Back to dashboard</Link>
      <h1>Messages</h1>
      <Status loading={loading} error={error} reload={reload} />
      {data && data.length === 0 && <p>No messages yet. Questions, enquiries and listing submissions will show here.</p>}
      <div className="messages">
        {data?.map((m) => (
          <article key={m.id} className={`message ${m.read ? "" : "unread"}`}>
            <header>
              <span className="type">{m.type}</span>
              <small className="muted">{new Date(m.date).toLocaleString()}</small>
            </header>
            <p><strong>{m.name}</strong> · <a href={`mailto:${m.email}`}>{m.email}</a>{m.phone && ` · ${m.phone}`}</p>
            {m.type === "Submit a listing" && (
              <p className="submitted">
                {m.listingTitle} · {m.listingCategory} · {m.listingLocation} · {formatPrice(m.listingPrice)}
              </p>
            )}
            <p>{m.message}</p>
            <div className="msg-actions">
              {!m.read && <button className="btn-outline" onClick={() => read(m.id)}>Mark as read</button>}
              <button className="btn btn-danger" onClick={() => remove(m.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
