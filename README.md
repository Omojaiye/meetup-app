# Suleja Homes (React frontend)

    npm install
    npm run dev

Demo admin login (sample data only): admin@sulejahomes.com / admin123

## Everything comes from the backend
Pages never hold data. They ask `src/api/index.js`, which today returns SAMPLE data
from `src/api/mock.js` (placeholder photos and listings, for visuals only).

### Switch to the real backend
1. Open `src/api/index.js`, set `USE_MOCK = false`
2. Create `.env` with `VITE_API_URL=http://localhost:5000/api`
3. Build the endpoints listed above each function in `src/api/index.js`
4. Delete `src/api/mock.js` and `src/api/mockData.js`

The Property schema and the response shapes are at the top of `src/api/index.js`.
Search the code for "BACKEND" to see every place data is fetched or saved.

## Folders
    src/
      main.jsx, App.jsx     root render + routes only
      index.css             global styles
      api/                  index.js (real calls), mock.js + mockData.js (delete later)
      context/              AuthContext (logged-in user and token)
      hooks/useFetch.js     loading / error / data for any API call
      utils/format.js       price formatting
      components/           Navbar, Footer, PropertyCard, PropertyGrid, LikeButton, Stars, Img, Status, AdminRoute
      pages/                Properties, PropertyDetails, About, Contact (each .jsx + .css)
        Auth/  Login, Register          Admin/  Dashboard, ListingForm, Messages

## Rules
- Visitors: browse, view details and map, send contact messages
- Registered users: also like and rate
- Admin only: create, edit, delete listings and read messages
- Hiding admin pages in React is not security. Express must check role === "admin" (JWT) on those routes.

## Class note
The Home page is not included. We build it together in class (src/pages/Home/Home.jsx + Home.css).
Until then the "/" route shows the Properties page.
