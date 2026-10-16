import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import Img from "../Img/Img";
import LikeButton from "../LikeButton/LikeButton";
import "./PropertyCard.css";

// One property card. Every field comes from the backend (see the schema in api/index.js).
export default function PropertyCard({ p }) {
  return (
    <Link to={`/property/${p.id}`} className="card">
      <div className="card-img">
        <Img src={p.images?.[0]} alt={p.title} />
        <LikeButton p={p} />
        {p.hot && <span className="tag">Hot</span>}
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <p className="muted">{p.location}</p>
        <p className="price">{formatPrice(p.price)}</p>
        <p className="muted">{p.beds} bed · {p.baths} bath · {p.area} sqm</p>
      </div>
    </Link>
  );
}
