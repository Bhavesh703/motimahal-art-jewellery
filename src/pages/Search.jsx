import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import "../styles/search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(list);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const normalizedQuery = query.toLowerCase().trim();

  // 🔥 Optimized filtering
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return [];

    return products.filter((product) =>
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery, products]);

  return (
    <section className="search-page">
      <div className="search-header">
        <h1>Find Your Perfect Jewellery</h1>
        <p>Search by name, category, or style</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search earrings, necklaces, bridal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <div className="product-grid">
          {loading ? (
            <p className="search-message">Loading products...</p>
          ) : normalizedQuery.length === 0 ? (
            <p className="search-message">
              Start typing to explore our collection.
            </p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="search-message">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
