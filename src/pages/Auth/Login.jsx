import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form.email, form.password); // BACKEND: POST /api/auth/login
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section narrow">
      <h1>Welcome back</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>Email<input name="email" type="email" required onChange={change} /></label>
        <label>Password<input name="password" type="password" required onChange={change} /></label>
        <button className="btn">Log in</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
      <p className="hint">Demo admin (sample data only): admin@sulejahomes.com / admin123</p>
    </section>
  );
}
