import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// @ts-ignore App.jsx has no declaration file.
import App from "./App";
// @ts-ignore AuthContext has no declaration file.
// import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </BrowserRouter>
);