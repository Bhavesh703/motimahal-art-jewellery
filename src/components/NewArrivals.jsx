import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/sections.css";

export default function NewArrivals({
  products = [],
  addToCart,
  addToWishlist,
}) {
  if (!Array.isArray(products) || products.length === 0) return null;

  // ================= FILTER + SORT =================
  const sortedProducts = [...products]
    // Only show in-stock products
    .filter((item) => item.stock === undefined || item.stock > 0)

    // Sort priority:
    // 1️⃣ Featured
    // 2️⃣ On Sale
    // 3️⃣ Newest
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      if (a.priceSale && !b.priceSale) return -1;
      if (!a.priceSale && b.priceSale) return 1;

      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;

      return bTime - aTime;
    })

    // Show only latest 8
    .slice(0, 8);

  if (sortedProducts.length === 0) return null;

  return (
    <section className="container new-arrivals-section">
      <div className="section-header">
        <h2 className="section-title">New Arrivals</h2>

        {/* ✅ FIXED ROUTE */}
        <Link to="/new-arrivals" className="view-all-btn">
          View All →
        </Link>
      </div>

      <div className="horizontal-scroll">
        {sortedProducts.map((item, index) => (
          <motion.div
            key={item.id}
            className="arrival-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <ProductCard
              product={item}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
