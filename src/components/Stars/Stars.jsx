import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { rateProperty } from "../../api";
import { useAuth } from "../../context/AuthContext";
import "./Stars.css";

// p = a property from the backend (uses p.id and p.myRating).
export default function Stars({ p, onRated }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mine, setMine] = useState(p.myRating || 0);

  const click = async (n) => {
    if (!user) return navigate("/login");
    try {
      const updated = await rateProperty(p.id, n); // BACKEND: POST /api/properties/:id/rate
      setMine(n);
      onRated?.(updated); // lets the page refresh the average rating
    } catch { /* ignore */ }
  };

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => click(n)} className={n <= mine ? "on" : ""} aria-label={`${n} stars`}>★</button>
      ))}
    </div>
  );
}
