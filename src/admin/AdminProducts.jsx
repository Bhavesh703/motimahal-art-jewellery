import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./admin.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", id));
    loadProducts();
  };

  return (
    <div className="products-container">
      <h2 className="admin-title">Products</h2>

      <div className="product-grid-admin">
        {products.map((p) => (
          <div key={p.id} className="product-card-admin">
            <img
              src={p.images?.[0]}
              alt={p.name}
              className="admin-product-img"
            />

            <div className="admin-product-info">
              <h4>{p.name}</h4>

              <div className="admin-price-box">
                {p.priceSale ? (
                  <>
                    <span className="sale-price">₹{p.priceSale}</span>
                    <span className="original-price">₹{p.priceOriginal}</span>
                  </>
                ) : (
                  <span className="sale-price">₹{p.priceOriginal}</span>
                )}
              </div>

              <p className="stock">
                Stock:{" "}
                <span className={p.stock > 0 ? "in-stock" : "out-stock"}>
                  {p.stock > 0 ? p.stock : "Out of Stock"}
                </span>
              </p>

              {p.featured && <span className="featured-badge">Featured</span>}
            </div>

            <button className="delete-btn" onClick={() => removeProduct(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
