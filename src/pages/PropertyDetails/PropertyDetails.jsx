import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProperty } from "../../api";
import useFetch from "../../hooks/useFetch";
import { formatPrice } from "../../utils/format";
import Img from "../../components/Img/Img";
import LikeButton from "../../components/LikeButton/LikeButton";
import Stars from "../../components/Stars/Stars";
import Status from "../../components/Status/Status";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const { data: p, loading, error, reload } = useFetch(() => getProperty(id), [id]); // GET /api/properties/:id
  const [main, setMain] = useState(0);
  const [rating, setRating] = useState(null); // updated average after the user rates

  if (loading || error) return (
    <section className="section">
      <Link to="/properties">← Back to properties</Link>
      <Status loading={loading} error={error} reload={reload} />
    </section>
  );

  const images = p.images?.length ? p.images : [null]; // [null] shows the placeholder
  const avg = (rating ?? p).avgRating;
  const count = (rating ?? p).ratingCount;

  return (
    <section className="section">
      <Link to="/properties">← Back to properties</Link>
      <div className="details-top">
        <div>
          <Img className="main-img" src={images[main]} alt={p.title} />
          <div className="thumbs">
            {images.map((src, i) => (
              <Img key={i} src={src} className={i === main ? "active" : ""} onClick={() => setMain(i)} />
            ))}
          </div>
        </div>
        <div>
          <h1>{p.title}</h1>
          <p className="muted">{p.location} · {p.category}</p>
          <p className="price big">{formatPrice(p.price)}</p>
          <p>{p.beds} bed · {p.baths} bath · {p.area} sqm</p>
          <p>{p.description}</p>
          <p className="muted">
            {count > 0 ? `★ ${avg.toFixed(1)} (${count} rating${count > 1 ? "s" : ""})` : "No ratings yet"} · {p.likesCount} likes
          </p>
          <div className="actions">
            <LikeButton p={p} className="inline" />
            <Stars p={p} onRated={setRating} />
          </div>
          <Link to={`/contact?type=Enquiry&property=${encodeURIComponent(p.title)}`} className="btn">Send an enquiry</Link>
        </div>
      </div>
      <h2>Location</h2>
      {/* The map pin comes from p.lat and p.lng saved by the admin. */}
      <iframe
        className="map"
        title="Property location"
        loading="lazy"
        src={`https://maps.google.com/maps?q=${p.lat},${p.lng}&z=15&output=embed`}
      />
    </section>
  );
}
