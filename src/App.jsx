import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AdminRoute from "./components/AdminRoute";
import Properties from "./pages/Properties/Properties";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ListingForm from "./pages/Admin/ListingForm";
import Messages from "./pages/Admin/Messages";

// App.jsx only decides which page shows for each URL.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* TEMPORARY: we build the Home page in class. Then change this to <Home /> and import it above. */}
          <Route path="/" element={<Properties />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin only */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/new" element={<AdminRoute><ListingForm /></AdminRoute>} />
          <Route path="/admin/edit/:id" element={<AdminRoute><ListingForm /></AdminRoute>} />
          <Route path="/admin/messages" element={<AdminRoute><Messages /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
