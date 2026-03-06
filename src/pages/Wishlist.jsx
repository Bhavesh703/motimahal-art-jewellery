import ProductCard from "../components/ProductCard";

export default function Wishlist({ wishlist }) {
  if (wishlist.length === 0)
    return <h2 className="container">No wishlist items</h2>;

  return (
    <section className="container">
      <h2 className="section-title">Wishlist</h2>

      <div className="product-grid">
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
