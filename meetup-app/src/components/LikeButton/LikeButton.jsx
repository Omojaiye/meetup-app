import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleLike } from "../../api";
import { useAuth } from "../context/AuthContext";
import "./LikeButton.css";

// p = a property from the backend (uses p.id and p.likedByMe).
// Guests are sent to login. Use className="inline" outside a card.
export default function LikeButton({ p, className = "" }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(!!p.likedByMe);

  const click = async (e) => {
    e.preventDefault(); // stops the card link from opening
    if (!user) return navigate("/login");
    try {
      const res = await toggleLike(p.id); // BACKEND: POST /api/properties/:id/like
      setLiked(res.liked);
    } catch { /* ignore, the heart simply does not change */ }
  };

  return (
    <button className={`like ${className}`} onClick={click} aria-label={liked ? "Unlike" : "Like"}>
      {liked ? "❤️" : "🤍"}
    </button>
  );
}