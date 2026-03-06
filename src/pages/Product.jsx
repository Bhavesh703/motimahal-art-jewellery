import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import RecentlyViewed from "../components/RecentlyViewed";
import TrustStrip from "../components/TrustStrip";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import { getFinalPrice, hasDiscount, getDiscountPercent } from "../utils/price";
import "../styles/product.css";

export default function Product({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const snap = await getDoc(productRef);

        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() };
          setProduct(data);
          addRecentlyViewed(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="container">
        <h2>Loading...</h2>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container">
        <h2>Product not found</h2>
      </section>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const mainImage = images[activeImg] || "/placeholder.jpg";

  const finalPrice = getFinalPrice(product);
  const discount = getDiscountPercent(product);

  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <>
      <section className="product-page container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-layout">
          {/* LEFT: GALLERY */}
          <div className="product-gallery">
            <img
              src={mainImage}
              className="main-product-img"
              alt={product.name}
              loading="lazy"
            />

            <div className="thumb-row">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`thumb-img ${activeImg === i ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  alt={`${product.name}-${i}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="product-info">
            <h1>{product.name}</h1>

            <p className="category">{product.category}</p>

            {/* PRICE */}
            <div className="price-box">
              {hasDiscount(product) ? (
                <>
                  <span className="sale">₹{finalPrice.toLocaleString()}</span>

                  <span className="original">
                    ₹{product.priceOriginal.toLocaleString()}
                  </span>

                  <span className="discount">{discount}% OFF</span>
                </>
              ) : (
                <span className="sale">₹{finalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* STOCK */}
            {outOfStock ? (
              <p className="out-of-stock">Out of Stock</p>
            ) : (
              <p className="in-stock">
                In Stock ({product.stock || "Available"})
              </p>
            )}

            <p className="desc">{product.description}</p>

            <div className="product-actions">
              <button
                className="btn-outline"
                disabled={outOfStock}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

              <button
                className="btn-gold"
                disabled={outOfStock}
                onClick={() => {
                  addToCart(product);
                  navigate("/checkout");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
      <RecentlyViewed />
    </>
  );
}
