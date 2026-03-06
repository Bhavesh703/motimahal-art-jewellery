import { getRecentlyViewed } from "../utils/recentlyViewed";
import ProductCard from "./ProductCard";

export default function RecentlyViewed() {
  const products = getRecentlyViewed();

  if (products.length === 0) return null;

  return (
    <section className="container" style={{ marginTop: 60 }}>
      <h2 className="section-title">Recently Viewed</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
