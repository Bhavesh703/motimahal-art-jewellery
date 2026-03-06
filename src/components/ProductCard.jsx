import { Link } from "react-router-dom";
import { getFinalPrice, hasDiscount, getDiscountPercent } from "../utils/price";
import "../styles/product.css";

export default function ProductCard({ product }) {
  if (!product) return null;

  const images = Array.isArray(product.images) ? product.images : [];
  const primaryImage = images[0] || "/placeholder.jpg";
  const secondaryImage = images[1] || null;

  const finalPrice = getFinalPrice(product);
  const discount = getDiscountPercent(product);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image-wrapper">
          <img
            src={primaryImage}
            alt={product.name || "Product"}
            className="primary-img"
            loading="lazy"
          />

          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={product.name || "Product"}
              className="secondary-img"
              loading="lazy"
            />
          )}

          {/* Discount Badge */}
          {hasDiscount(product) && (
            <span className="discount-badge">{discount}% OFF</span>
          )}
        </div>

        <div className="product-card-info">
          <h4>{product.name || "Unnamed Product"}</h4>

          <div className="price-box">
            {hasDiscount(product) ? (
              <>
                <span className="sale">₹{finalPrice.toLocaleString()}</span>

                <span className="original">
                  ₹{Number(product.priceOriginal).toLocaleString()}
                </span>
              </>
            ) : (
              <span className="sale">₹{finalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
