import { Link, useNavigate } from "react-router-dom";
import { getCategories, getProperties } from "../../api";
import useFetch from "../../hooks/useFetch";
import Img from "../../components/Img/Img";
import PropertyGrid from "../../components/PropertyGrid/PropertyGrid";
import Status from "../../components/Status/Status";
import "./Home.css";



export default function Home() {
    const navigate = useNavigate();

    // Each section asks the backend for its own data.
    const featured = useFetch(() => getProperties({ limit: 6 }), []);
    // Get/api/properties?limit=6
    const categories = useFetch(() => getCategories(), []);
    //Get/api/categories
    const hot = useFetch(() => getProperties({ hot: true, limit: 8 }), []);
    //Get/api/properties?hot=true&limit+8
    const gallery = useFetch(() => getProperties({ limit: 9 }), []);
    //Get/api/properties?limit=9

    return (
        <>
            {/*PLACEHOLDER hero photo. Swap the URL in Home.css (or load it from the backend/CMS).*/}
            <section className="hero">
                <h1>Find the home that fits your life.</h1>
                <p>Browse apartments,duplexes,bungalows and land in Suleja and nearby areas.</p>
                <Link to="/properties"
                    className="btn">Browse properties</Link>
            </section>

            {/*Section 1: GRID*/}
            <section
                className="section">
                <h2>Featured properties</h2>
                <PropertyGrid
                    result={featured} emptyText="No listings yet.Please check back soon." />
            </section>

            {/*Section 2: CATEGORY*/}
            <section className="section alt">
                <h2>Browse by category</h2>
                <Status loading={categories.loading}
                    error={categories.error}
                    reload={categories.reload} />
                <div className="categories">
                    {categories.data?.map((c) => (
                        <button key={c.name}
                            className="category"
                            onClick={() => navigate(`/properties?category=${c.name}`)}>

                            <span>{c.icon}</span>
                            <strong>{c.name}</strong>
                            <small>{c.count}listing</small>
                        </button>
                    ))}
                </div>
            </section>

            {/*Section 3:HOT HOMES 
        (horizontal scroll)*/}
            <section
                className="section">
                <h2>Hot Homes</h2>
                <PropertyGrid result={hot}
                    className="scroller"
                    emptyText="No hot homes right now." />
            </section>

            {/*Section 4: MASONRY*/}
            <section className="section alt">
    <h2>Photo gallery</h2>
    <Status
        loading={gallery.loading}
        error={gallery.error}
        reload={gallery.reload} 
    />
    
    {/* Only render the container if data exists and has items */}
    {gallery.data && gallery.data.length > 0 && (
        <div className="masonry">
            {gallery.data.map((p) => (
                <Link to={`/property/${p.id}`} key={p.id} className="masonry-items">
                    <Img 
                        src={p.images?.[1] || p.images?.[0]} 
                        alt={p.title} 
                    />
                    <span>{p.title}</span>
                </Link>
            ))}
        </div>
    )}
</section>
         </>
        );
}

