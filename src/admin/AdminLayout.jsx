import { Link, Outlet, useLocation } from "react-router-dom";
import { FiBox, FiShoppingCart, FiPlusCircle, FiHome } from "react-icons/fi";
import "./admin.css";

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>

          <p>Moti Mahal Art Jewellery</p>
        </div>

        <nav className="admin-nav">
          <Link
            to="/"
            className={`admin-link ${isActive("/") ? "active" : ""}`}
          >
            <FiHome /> View Website
          </Link>

          <Link
            to="/admin/products"
            className={`admin-link ${
              isActive("/admin/products") ? "active" : ""
            }`}
          >
            <FiBox /> Products
          </Link>

          <Link
            to="/admin/orders"
            className={`admin-link ${
              isActive("/admin/orders") ? "active" : ""
            }`}
          >
            <FiShoppingCart /> Orders
          </Link>

          <Link
            to="/admin/add-product"
            className={`admin-link ${
              isActive("/admin/add-product") ? "active" : ""
            }`}
          >
            <FiPlusCircle /> Add Product
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
