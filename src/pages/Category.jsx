import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import "../styles/sections.css";

export default function Category() {
  const { name } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("latest");

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "products"),
          where("category", "==", name),
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Show only in stock (optional remove if not needed)
        const filtered = list.filter(
          (item) => item.stock === undefined || item.stock > 0,
        );

        setAllProducts(filtered);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchProducts();
  }, [name]);

  // ================= SAFE SORT LOGIC =================
  const products = useMemo(() => {
    let sorted = [...allProducts];

    if (sortType === "latest") {
      sorted.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
    }

    if (sortType === "low") {
      sorted.sort(
        (a, b) =>
          (a.priceSale || a.priceOriginal || 0) -
          (b.priceSale || b.priceOriginal || 0),
      );
    }

    if (sortType === "high") {
      sorted.sort(
        (a, b) =>
          (b.priceSale || b.priceOriginal || 0) -
          (a.priceSale || a.priceOriginal || 0),
      );
    }

    return sorted;
  }, [allProducts, sortType]);

  // ================= FORMAT TITLE =================
  const title = name
    ? name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  if (loading) {
    return (
      <section className="container">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="container category-page">
      {/* Banner */}
      <Reveal>
        <div className="category-banner">
          <h1>{title}</h1>
          <p>Explore our premium {title} collection</p>
        </div>
      </Reveal>

      {/* Sort Bar */}
      <div className="sort-bar">
        <span>{products.length} Products</span>

        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <Reveal>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-category">
              <h3>No products found</h3>
              <p>New arrivals coming soon ✨</p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
