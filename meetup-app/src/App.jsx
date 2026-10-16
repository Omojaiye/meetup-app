import { BrowserRouter } from "react-router-dom"; // Added for useNavigate support
import { AuthProvider } from "./components/context/AuthContext"; // Ensure path matches your project setup
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PropertyCard from "./components/PropertyCard/propertycard";
import PropertyGrid from "./components/PropertyGrid/PropertyGrid";

// Mock data to feed into the components so they don't crash while you test
const mockProperty = {
  id: "1",
  title: "Beautiful Modern Apartment",
  location: "Downtown, Cityville",
  price: 250000,
  beds: 3,
  baths: 2,
  area: 120,
  hot: true,
  likedByMe: false, // Required by LikeButton
  images: ["https://placeholder.com"]
};

const mockGridResult = {
  data: [mockProperty, { ...mockProperty, id: "2", title: "Cozy Beach House", hot: false }],
  loading: false,
  error: null,
  reload: () => console.log("Reloading...")
};

// App.jsx only decides which page shows for each URL.
// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/properties" element={<Properties />} />
//           <Route path="/property/:id" element={<PropertyDetails />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Admin only */}
//           <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
//           <Route path="/admin/new" element={<AdminRoute><ListingForm /></AdminRoute>} />
//           <Route path="/admin/edit/:id" element={<AdminRoute><ListingForm /></AdminRoute>} />
//           <Route path="/admin/messages" element={<AdminRoute><Messages /></AdminRoute>} />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        
        <main style={{ minHeight: "60vh", padding: "2rem 5%" }}>
          <h2>Testing Property Components:</h2>
          
          {/* Fed the required 'p' prop to the single card */}
          <PropertyCard p={mockProperty} />
          
          <hr style={{ margin: "2rem 0", opacity: 0.2 }} />
          
          {/* Fed the required 'result' object to the grid */}
          <PropertyGrid result={mockGridResult} />
        </main>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
