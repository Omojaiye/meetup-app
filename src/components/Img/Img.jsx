// Use this instead of <img>. Shows a grey "No photo yet" placeholder when the
// backend sends no image URL or the URL is broken.
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#e8f1ec"/><text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-family="sans-serif" font-size="36">No photo yet</text></svg>'
  );

export default function Img({ src, alt = "", ...rest }) {
  return (
    <img
      src={src || PLACEHOLDER}
      alt={alt}
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }}
      {...rest}
    />
  );
}
