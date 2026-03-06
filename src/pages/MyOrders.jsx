import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import "../styles/orders.css";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <section className="container">
        <h2>Please login to view your orders</h2>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container">
        <h2>Loading your orders...</h2>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="container">
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here.</p>
      </section>
    );
  }

  return (
    <section className="orders-wrapper">
      <h2 className="orders-title">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span>
              Order Date: {order.createdAt?.toDate().toLocaleDateString()}
            </span>
            <span className={`status ${order.paymentStatus}`}>
              {order.paymentStatus}
            </span>
          </div>

          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.images[0]} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <strong>₹{item.price * item.quantity}</strong>
            </div>
          ))}

          <div className="order-total">Total: ₹{order.total}</div>
        </div>
      ))}
    </section>
  );
}
