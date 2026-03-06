import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/checkout.css";
import "../styles/sections.css";

export default function Checkout({
  cartItems,
  clearCart,
  updateCart,
  removeFromCart,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "online",
  });

  // ================= AUTH PROTECTION =================
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  // ================= PRICE LOGIC =================
  const getItemPrice = (item) => item.priceSale || item.priceOriginal || 0;

  const total = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0,
  );

  const changeQty = (id, qty) => {
    if (qty < 1) return;
    updateCart(id, qty);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE ORDER =================
  const saveOrder = async (status, paymentId = null) => {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      userEmail: user.email,
      items: cartItems,
      total,
      address: form,
      paymentStatus: status,
      paymentId,
      orderStatus: "Pending",
      createdAt: serverTimestamp(),
    });

    clearCart();
    navigate("/orders");
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      // ================= COD =================
      if (form.paymentMethod === "cod") {
        await saveOrder("COD");
        alert("Order placed successfully!");
        setLoading(false);
        return;
      }

      // ================= CREATE RAZORPAY ORDER =================
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      if (!order.id) {
        throw new Error("Order creation failed");
      }

      const options = {
        key: "rzp_test_SEVbzf1fscmRR1", // change to rzp_live_xxx in production
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "FUBS Jewellers",
        description: "Order Payment",

        handler: async function (response) {
          try {
            // ================= VERIFY PAYMENT =================
            const verifyRes = await fetch(
              "http://localhost:5000/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              await saveOrder("Paid Online", response.razorpay_payment_id);
              alert("Payment Verified & Successful!");
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            alert("Verification error");
          }
        },

        prefill: {
          name: form.name,
          email: user.email,
          contact: form.phone,
        },

        theme: { color: "#c6a769" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }

    setLoading(false);
  };

  // ================= UI =================
  return (
    <section className="checkout-wrapper">
      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-left-card">
          <h2>Shipping Details</h2>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-grid">
              <input
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
            </div>

            <textarea
              name="address"
              placeholder="Full Address"
              required
              onChange={handleChange}
            />

            <div className="form-grid">
              <input
                name="city"
                placeholder="City"
                required
                onChange={handleChange}
              />
              <input
                name="pincode"
                placeholder="Pincode"
                required
                onChange={handleChange}
              />
            </div>

            <div className="payment-box">
              <label
                className={`payment-option ${
                  form.paymentMethod === "online" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={form.paymentMethod === "online"}
                  onChange={handleChange}
                />
                💳 Pay Online
              </label>
              {/* cod delivery */}
              {/* <label
                className={`payment-option ${
                  form.paymentMethod === "cod" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                🚚 Cash on Delivery
              </label> */}
            </div>

            <button className="checkout-btn" disabled={loading}>
              {loading
                ? "Processing..."
                : `Place Order ₹${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-summary-card">
          <h3>Order Summary</h3>

          {cartItems.map((item) => {
            const price = getItemPrice(item);

            return (
              <div key={item.id} className="summary-item-row">
                <img src={item.images?.[0]} alt={item.name} />

                <div className="summary-info">
                  <h4>{item.name}</h4>
                  <p>₹{price.toLocaleString()}</p>

                  <div className="qty-control">
                    <button
                      type="button"
                      onClick={() => changeQty(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="summary-price">
                  ₹{(price * item.quantity).toLocaleString()}
                </div>
              </div>
            );
          })}

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
