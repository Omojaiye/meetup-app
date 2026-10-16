// SAMPLE DATA FOR VISUALS ONLY. Delete this file (and api/mock.js) when the backend is ready.
const img = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const categories = [
  { name: "Apartment", icon: "🏢" },
  { name: "Duplex", icon: "🏘️" },
  { name: "Bungalow", icon: "🏡" },
  { name: "Land", icon: "🌳" },
];

export const properties = [
  {
    id: "1", title: "Modern 4-Bed Duplex", category: "Duplex", price: 85000000,
    location: "Tafa Road, Suleja", beds: 4, baths: 5, area: 420, hot: true,
    lat: 9.201, lng: 7.21,
    description: "A bright modern duplex with a large living room, fitted kitchen, boys quarters, and 24/7 security in a quiet estate.",
    images: [img("photo-1568605114967-8130f3a36994"), img("photo-1600585154340-be6161a56a0c"), img("photo-1600607687939-ce8a6c25118c")],
  },
  {
    id: "2", title: "Luxury 3-Bed Apartment", category: "Apartment", price: 45000000,
    location: "Madalla, Suleja", beds: 3, baths: 3, area: 210, hot: true,
    lat: 9.14, lng: 7.23,
    description: "Spacious apartment on the 2nd floor with a balcony, ample parking and constant power supply.",
    images: [img("photo-1545324418-cc1a3fa10c00"), img("photo-1502672260266-1c1ef2d93688"), img("photo-1560448204-e02f11c3d0e2")],
  },
  {
    id: "3", title: "Cozy 2-Bed Bungalow", category: "Bungalow", price: 28000000,
    location: "Kwamba, Suleja", beds: 2, baths: 2, area: 160, hot: false,
    lat: 9.17, lng: 7.16,
    description: "A neat bungalow with a fenced compound, tiled floors and a small garden. Ideal for a young family.",
    images: [img("photo-1570129477492-45c003edd2be"), img("photo-1580587771525-78b9dba3b914"), img("photo-1598228723793-52759bba239c")],
  },
  {
    id: "4", title: "Serviced Studio Flat", category: "Apartment", price: 18000000,
    location: "Suleja Central", beds: 1, baths: 1, area: 65, hot: false,
    lat: 9.1806, lng: 7.1795,
    description: "A fully serviced studio close to offices and malls, with water treatment and backup power.",
    images: [img("photo-1522708323590-d24dbb6b0267"), img("photo-1493809842364-78817add7ffb"), img("photo-1484154218962-a197022b5858")],
  },
  {
    id: "5", title: "Executive 5-Bed Mansion", category: "Duplex", price: 220000000,
    location: "Hajj Camp Road, Suleja", beds: 5, baths: 6, area: 650, hot: true,
    lat: 9.19, lng: 7.195,
    description: "A grand mansion with a pool, home cinema, smart security system and a large landscaped compound.",
    images: [img("photo-1613490493576-7fde63acd811"), img("photo-1600596542815-ffad4c1539a9"), img("photo-1512917774080-9991f1c4c750")],
  },
  {
    id: "6", title: "600sqm Land, Dry & Fenced", category: "Land", price: 12000000,
    location: "Tudun Wada, Suleja", beds: 0, baths: 0, area: 600, hot: false,
    lat: 9.165, lng: 7.185,
    description: "A dry plot with C of O, close to the main road. Perfect for residential development.",
    images: [img("photo-1500382017468-9049fed747ef"), img("photo-1473448912268-2022ce9509d8"), img("photo-1500076656116-558758c991c1")],
  },
  {
    id: "7", title: "Smart 3-Bed Terrace", category: "Duplex", price: 52000000,
    location: "Dikko Road, Suleja", beds: 3, baths: 4, area: 240, hot: true,
    lat: 9.175, lng: 7.17,
    description: "A terrace duplex in a gated estate with a gym, playground and 24/7 power.",
    images: [img("photo-1564013799919-ab600027ffc6"), img("photo-1583608205776-bfd35f0d9f83"), img("photo-1556912172-45b7abe8b7e1")],
  },
  {
    id: "8", title: "Family 4-Bed Bungalow", category: "Bungalow", price: 38000000,
    location: "Gawu, Suleja", beds: 4, baths: 3, area: 300, hot: false,
    lat: 9.155, lng: 7.2,
    description: "A spacious bungalow with a big backyard, tiled floors and a borehole.",
    images: [img("photo-1605276374104-dee2a0ed3cd6"), img("photo-1576941089067-2de3c901e126"), img("photo-1600566753190-17f0baa2a6c3")],
  },
];