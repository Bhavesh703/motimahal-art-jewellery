import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import "../styles/sections.css";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const inStock = list.filter(
        (item) => item.stock === undefined || item.stock > 0,
      );

      setProducts(inStock);
    };

    fetchProducts();
  }, []);

  return (
    <section className="container category-page">
      <div className="category-banner">
        <h1>New Arrivals</h1>
        <p>Discover our latest jewellery collection ✨</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
