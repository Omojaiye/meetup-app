// import { createContext, useContext, useState } from "react";
// // import * as api from "../api";

// // Holds only the logged-in user. All other data comes from the backend through api/index.js.
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// const saved = () => { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } };

// export function AuthProvider({ children }) {
//   // BACKEND (optional): on app start, call GET /api/auth/me with the token to confirm the user.
//   const [user, setUser] = useState(saved());

//   const start = ({ user, token }) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//     return user;
//   };

//   const login = async (email, password) => start(await api.login(email, password));
//   const register = async (name, email, password) => start(await api.register(name, email, password));
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAdmin: user?.role === "admin", login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }