import { Link } from "react-router-dom";
import { formatPrice } from "../Utils/Format";
import Img from "../Img/Img";
import LikeButton from "../LikeButton/LikeButton";
import "./PropertyCard.css";

// One property card. Every field comes from the backend (see the schema in api/index.js).
export default function PropertyCard({ p }) {
  // Safe guard: Prevents the "Cannot read properties of undefined" error
  if (!p) return null;

  return (
    <Link to={`/property/${p?.id}`} className="card">
      <div className="card-img">
        <Img src={p?.images?.[0]} alt={p?.title || "Property image"} />
        <LikeButton p={p} />
        {p?.hot && <span className="tag">Hot</span>}
      </div>
      <div className="card-body">
        <h3>{p?.title || "No Title Provided"}</h3>
        <p className="muted">{p?.location || "No Location Specified"}</p>
        <p className="price">{p?.price ? formatPrice(p.price) : "Contact for Price"}</p>
        <p className="muted">
          {p?.beds || 0} bed · {p?.baths || 0} bath · {p?.area || 0} sqm
        </p>
      </div>
    </Link>
  );
}
