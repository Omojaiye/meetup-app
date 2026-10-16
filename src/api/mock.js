// FAKE BACKEND, for visuals only. It copies what the real API will return.
// When Express + MongoDB are ready: set USE_MOCK = false in api/index.js, then delete this file.
import { properties as seed, categories as cats } from "./mockData";

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const wait = (v) => new Promise((r) => setTimeout(() => r(v), 300)); // fake network delay
const fail = (m) => new Promise((_, rej) => setTimeout(() => rej(new Error(m)), 300));

// DEMO ONLY: the real backend checks the admin login, never the frontend.
const ADMIN = { email: "admin@sulejahomes.com", password: "admin123" };

const all = () => load("mockProperties", seed);
const me = () => load("user", null);

// Adds the per-user fields the backend will compute: likesCount, likedByMe, avgRating, myRating
const decorate = (p) => {
  const likes = load("mockLikes", {})[p.id] || [];
  const rated = load("mockRatings", {})[p.id] || {};
  const nums = Object.values(rated);
  const u = me();
  return {
    ...p,
    likesCount: likes.length,
    likedByMe: !!u && likes.includes(u.email),
    avgRating: nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0,
    ratingCount: nums.length,
    myRating: (u && rated[u.email]) || 0,
  };
};

export const getProperties = ({ category, search, hot, limit } = {}) => {
  let list = all();
  if (category) list = list.filter((p) => p.category === category);
  if (search) list = list.filter((p) => (p.title + p.location).toLowerCase().includes(search.toLowerCase()));
  if (hot) list = list.filter((p) => p.hot);
  if (limit) list = list.slice(0, Number(limit));
  return wait(list.map(decorate));
};
export const getProperty = (id) => {
  const p = all().find((x) => x.id === id);
  return p ? wait(decorate(p)) : fail("Property not found.");
};
export const getCategories = () =>
  wait(cats.map((c) => ({ ...c, count: all().filter((p) => p.category === c.name).length })));
export const createProperty = (data) => {
  const p = { ...data, id: Date.now().toString() };
  save("mockProperties", [p, ...all()]);
  return wait(p);
};
export const updateProperty = (id, data) => {
  save("mockProperties", all().map((p) => (p.id === id ? { ...p, ...data } : p)));
  return wait({ success: true });
};
export const deleteProperty = (id) => {
  save("mockProperties", all().filter((p) => p.id !== id));
  return wait({ success: true });
};

export const register = (name, email) => wait({ user: { name, email, role: "user" }, token: "mock-token" });
export const login = (email, password) => {
  if (email === ADMIN.email) {
    return password === ADMIN.password
      ? wait({ user: { name: "Admin", email, role: "admin" }, token: "mock-token" })
      : fail("Wrong email or password.");
  }
  return wait({ user: { name: email.split("@")[0], email, role: "user" }, token: "mock-token" });
};

export const toggleLike = (id) => {
  const likes = load("mockLikes", {});
  const list = likes[id] || [];
  const email = me().email;
  const liked = !list.includes(email);
  likes[id] = liked ? [...list, email] : list.filter((e) => e !== email);
  save("mockLikes", likes);
  return wait({ liked, likesCount: likes[id].length });
};
export const rateProperty = (id, stars) => {
  const ratings = load("mockRatings", {});
  ratings[id] = { ...(ratings[id] || {}), [me().email]: stars };
  save("mockRatings", ratings);
  return wait(decorate(all().find((p) => p.id === id)));
};

export const getMessages = () => wait(load("mockMessages", []));
export const sendMessage = (m) => {
  save("mockMessages", [{ ...m, id: Date.now().toString(), date: new Date().toISOString(), read: false }, ...load("mockMessages", [])]);
  return wait({ success: true });
};
export const markMessageRead = (id) => {
  save("mockMessages", load("mockMessages", []).map((m) => (m.id === id ? { ...m, read: true } : m)));
  return wait({ success: true });
};
export const deleteMessage = (id) => {
  save("mockMessages", load("mockMessages", []).filter((m) => m.id !== id));
  return wait({ success: true });
};
