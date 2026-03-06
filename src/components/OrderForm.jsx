import "../styles/product.css";

export default function OrderForm({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="order-overlay">
      <div className="order-box">
        <h3>Order Enquiry</h3>
        <p className="order-product-name">{product.name}</p>

        <form
          action="https://formspree.io/f/your-form-id"
          method="POST"
          className="order-form"
        >
          <input name="name" placeholder="Full Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="phone" placeholder="Phone Number" required />
          <textarea name="address" placeholder="Full Address" required />
          <input type="hidden" name="product" value={product.name} />

          <button type="submit" className="btn-gold" style={{ width: "100%" }}>
            Submit Enquiry
          </button>
        </form>

        <button className="order-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
