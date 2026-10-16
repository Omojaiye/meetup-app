import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password); // BACKEND: POST /api/auth/register
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section narrow">
      <h1>Create your account</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>Full name<input name="name" required onChange={change} /></label>
        <label>Email<input name="email" type="email" required onChange={change} /></label>
        <label>Password<input name="password" type="password" minLength="6" required onChange={change} /></label>
        <button className="btn">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Log in</Link></p>
    </section>
  );
}
