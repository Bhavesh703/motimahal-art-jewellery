import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import "./admin.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    setOrders(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { orderStatus: status });
    loadOrders();
  };

  return (
    <div className="orders-container">
      <h2 className="admin-title">Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((o) => (
        <div key={o.id} className="order-card">
          {/* Order Top */}
          <div className="order-header">
            <div>
              <h4>{o.userEmail}</h4>
              <p className="order-id">Order ID: {o.id}</p>
            </div>

            <div className="order-right">
              <span className="order-total">₹{o.total}</span>

              <span className={`status-badge ${o.orderStatus || "Processing"}`}>
                {o.orderStatus || "Processing"}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="order-items">
            {o.items?.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.images?.[0]} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <span>
                    ₹{item.priceSale || item.priceOriginal} × {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Update Status */}
          <div className="order-actions">
            <select
              value={o.orderStatus || "Processing"}
              onChange={(e) => updateStatus(o.id, e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
