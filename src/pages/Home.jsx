import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CategoryShowcase from "../components/CategoryShowcase";
import Trending from "../components/Trending";
import NewArrivals from "../components/NewArrivals";
import WhyChooseUs from "../components/WhyChooseUs";
import Instagram from "../components/Instagram";
import Reveal from "../components/Reveal";
import SkeletonCard from "../components/SkeletonCard";
import { fetchProducts } from "../services/productService";

export default function Home({ addToCart, addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ================= FILTER LOGIC =================

  // Trending = featured products from admin
  const trendingProducts = products
    .filter((product) => product.featured === true)
    .slice(0, 4);

  // New Arrivals = latest created products
  const newArrivalProducts = [...products]
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    })
    .slice(0, 4);

  return (
    <>
      <Hero />

      {/* Category Section (ONLY ONCE) */}
      <Reveal>
        <CategoryShowcase />
      </Reveal>

      {/* ================= TRENDING ================= */}
      {/* <Reveal>
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <Trending
            products={trendingProducts}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        )}
      </Reveal> */}

      {/* ================= NEW ARRIVALS ================= */}
      <Reveal>
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <NewArrivals
            products={newArrivalProducts}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        )}
      </Reveal>

      <Reveal>
        <WhyChooseUs />
      </Reveal>

      <Reveal>
        <Instagram />
      </Reveal>
    </>
  );
}
