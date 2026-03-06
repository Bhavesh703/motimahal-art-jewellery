import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

export default function Cart({ cart = [], updateCart, removeFromCart }) {
  const navigate = useNavigate();

  // 🔥 Safe price resolver
  const getPrice = (item) => {
    if (item.priceSale) return Number(item.priceSale);
    if (item.priceOriginal) return Number(item.priceOriginal);
    if (item.price) return Number(item.price);
    return 0;
  };

  // 🔥 Calculate total safely
  const total = cart.reduce(
    (sum, item) => sum + getPrice(item) * (item.quantity || 1),
    0,
  );

  // 🔥 Change quantity safely
  const changeQty = (id, newQty) => {
    if (newQty < 1) return;
    updateCart(id, newQty);
  };

  // 🔥 Empty cart view
  if (!cart || cart.length === 0) {
    return (
      <section className="container cart-empty">
        <h2>Your cart is empty</h2>
        <button className="btn-gold" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="container cart-page">
      <h2 className="section-title">Shopping Bag</h2>

      <div className="cart-layout">
        {/* LEFT — ITEMS */}
        <div className="cart-items">
          {cart.map((item) => {
            const price = getPrice(item);
            const qty = item.quantity || 1;

            return (
              <div key={item.id} className="cart-item">
                <img src={item.images?.[0]} alt={item.name} />

                <div className="cart-info">
                  <h4>{item.name}</h4>

                  {/* PRICE SECTION */}
                  <div className="cart-price-box">
                    {item.priceSale ? (
                      <>
                        <span className="sale">
                          ₹{Number(item.priceSale).toLocaleString()}
                        </span>
                        <span className="original">
                          ₹{Number(item.priceOriginal).toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span>₹{price.toLocaleString()}</span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="cart-actions">
                    <div className="qty-control">
                      <button onClick={() => changeQty(item.id, qty - 1)}>
                        −
                      </button>

                      <span>{qty}</span>

                      <button onClick={() => changeQty(item.id, qty + 1)}>
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* LINE TOTAL */}
                <div className="cart-line-total">
                  ₹{(price * qty).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString()}</strong>
          </div>

          <button
            className="btn-gold checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
