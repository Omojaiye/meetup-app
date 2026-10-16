import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, sendMessage } from "../../api";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./Contact.css";

const TYPES = ["Question", "Enquiry", "Submit a listing"];

export default function Contact() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const property = params.get("property");
  const categories = useFetch(() => getCategories(), []);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: TYPES.includes(params.get("type")) ? params.get("type") : "Question",
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    message: property ? `I am interested in "${property}".` : "",
    listingTitle: "", listingCategory: "", listingLocation: "", listingPrice: "",
  });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await sendMessage(form); // BACKEND: POST /api/messages (the admin reads it in the inbox)
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) return (
    <section className="section narrow">
      <h1>Contact us</h1>
      <p className="success">Thanks! Your {form.type.toLowerCase()} has been sent to the admin. We will reply by email.</p>
    </section>
  );

  return (
    <section className="section narrow">
      <h1>Contact us</h1>
      <p className="muted">Ask a question, make an enquiry, or send us a property to list. Only our admin can publish listings.</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>What is this about?
          <select name="type" value={form.type} onChange={change}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>Name<input name="name" value={form.name} required onChange={change} /></label>
        <label>Email<input name="email" type="email" value={form.email} required onChange={change} /></label>
        <label>Phone<input name="phone" value={form.phone} onChange={change} /></label>

        {form.type === "Submit a listing" && (
          <fieldset className="listing-fields">
            <legend>Property details</legend>
            <label>Property title<input name="listingTitle" required onChange={change} /></label>
            <label>Category
              <select name="listingCategory" value={form.listingCategory} required onChange={change}>
                <option value="">Choose a category</option>
                {categories.data?.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </label>
            <label>Location<input name="listingLocation" required onChange={change} /></label>
            <label>Asking price (₦)<input name="listingPrice" type="number" min="0" required onChange={change} /></label>
          </fieldset>
        )}

        <label>Message<textarea name="message" rows="5" value={form.message} required onChange={change} /></label>
        <button className="btn" disabled={sending}>{sending ? "Sending…" : "Send to admin"}</button>
      </form>
    </section>
  );
}
