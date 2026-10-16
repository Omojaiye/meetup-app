/* =====================================================================
   THE ONLY FILE THAT TALKS TO THE BACKEND.
   Every page imports from here, so swapping to the real API is a one-file job.

   HOW TO SWITCH:  1) set USE_MOCK = false   2) set VITE_API_URL in a .env file
                   3) make the backend return the shapes described below.

   PROPERTY SCHEMA (Mongoose example, mirror this in the backend):
     title: String, category: String, price: Number, location: String,
     beds: Number, baths: Number, area: Number,
     lat: Number, lng: Number,            // for the map
     hot: Boolean, description: String,
     images: [String]                     // image URLs (Cloudinary, S3, etc.)
   The backend adds these per request (the page only displays them):
     likesCount, likedByMe, avgRating, ratingCount, myRating
   The page uses `id`. With Mongoose use schema.set("toJSON", { virtuals: true })
   or change p.id to p._id in the pages.

   AUTH: login/register return { user: { name, email, role: "user" | "admin" }, token }.
   The token is saved in localStorage and sent as "Authorization: Bearer <token>".
   The backend MUST check role === "admin" on create, update and delete routes.
   ===================================================================== */
import * as mock from "./mock";

const USE_MOCK = true; // BACKEND: change to false when Express is running
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

// Turns { category: "Duplex", search: "" } into "category=Duplex" (empty values are dropped)
const qs = (params) =>
  new URLSearchParams(Object.entries(params).filter(([, v]) => v !== "" && v != null)).toString();
/* ---------- Properties ---------- */
// GET /api/properties?category=&search=&hot=true&limit=6   -> [Property]
export const getProperties = (params = {}) =>
  USE_MOCK ? mock.getProperties(params) : request(`/properties?${qs(params)}`);

// GET /api/properties/:id   -> Property
export const getProperty = (id) =>
  USE_MOCK ? mock.getProperty(id) : request(`/properties/${id}`);

// GET /api/categories   -> [{ name, icon, count }]   (count = number of listings)
export const getCategories = () =>
  USE_MOCK ? mock.getCategories() : request("/categories");

// ADMIN ONLY. POST /api/properties   body: Property   -> Property
export const createProperty = (data) =>
  USE_MOCK ? mock.createProperty(data) : request("/properties", { method: "POST", body: data });

// ADMIN ONLY. PUT /api/properties/:id   body: Property   -> { success: true }
export const updateProperty = (id, data) =>
  USE_MOCK ? mock.updateProperty(id, data) : request(`/properties/${id}`, { method: "PUT", body: data });

// ADMIN ONLY. DELETE /api/properties/:id   -> { success: true }
export const deleteProperty = (id) =>
  USE_MOCK ? mock.deleteProperty(id) : request(`/properties/${id}`, { method: "DELETE" });

/* ---------- Auth ---------- */
// POST /api/auth/register   body: { name, email, password }   -> { user, token }
export const register = (name, email, password) =>
  USE_MOCK ? mock.register(name, email) : request("/auth/register", { method: "POST", body: { name, email, password } });

// POST /api/auth/login   body: { email, password }   -> { user, token }
export const login = (email, password) =>
  USE_MOCK ? mock.login(email, password) : request("/auth/login", { method: "POST", body: { email, password } });

/* ---------- Likes and ratings (logged-in users) ---------- */
// POST /api/properties/:id/like   -> { liked: true | false, likesCount }
export const toggleLike = (id) =>
  USE_MOCK ? mock.toggleLike(id) : request(`/properties/${id}/like`, { method: "POST" });

// POST /api/properties/:id/rate   body: { stars: 1-5 }   -> Property (with new avgRating)
export const rateProperty = (id, stars) =>
  USE_MOCK ? mock.rateProperty(id, stars) : request(`/properties/${id}/rate`, { method: "POST", body: { stars } });

/* ---------- Contact messages ---------- */
// POST /api/messages (anyone)
// body: { type: "Question" | "Enquiry" | "Submit a listing", name, email, phone, message,
//         listingTitle, listingCategory, listingLocation, listingPrice }
export const sendMessage = (data) =>
  USE_MOCK ? mock.sendMessage(data) : request("/messages", { method: "POST", body: data });

// ADMIN ONLY. GET /api/messages   -> [{ id, date, read, ...message fields }]
export const getMessages = () =>
  USE_MOCK ? mock.getMessages() : request("/messages");

// ADMIN ONLY. PATCH /api/messages/:id/read
export const markMessageRead = (id) =>
  USE_MOCK ? mock.markMessageRead(id) : request(`/messages/${id}/read`, { method: "PATCH" });

// ADMIN ONLY. DELETE /api/messages/:id
export const deleteMessage = (id) =>
  USE_MOCK ? mock.deleteMessage(id) : request(`/messages/${id}`, { method: "DELETE" });
