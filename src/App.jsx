import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import Delivery from "./pages/Delivery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrdersPage from "./pages/MyOrdersPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";

import Terms from "./pages/Terms";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import Privacy from "./pages/Privacy";

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AddProduct from "./admin/AddProduct";

import useLocalStorage from "./hooks/useLocalStorage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const { user } = useAuth();

  const [cart, setCart] = useLocalStorage("cart", []);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  // ================= CART =================
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (id, quantity) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // ================= WISHLIST =================
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <>
      <ScrollToTop />

      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />

      <Routes>
        {/* ============ PUBLIC ROUTES ============ */}

        <Route
          path="/"
          element={<Home addToCart={addToCart} addToWishlist={addToWishlist} />}
        />

        <Route path="/category/:name" element={<Category />} />
        <Route
          path="/product/:id"
          element={<Product addToCart={addToCart} />}
        />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateCart={updateCart}
              removeFromCart={removeFromCart}
            />
          }
        />

        {/* Protected Checkout */}
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout
                cartItems={cart}
                clearCart={clearCart}
                updateCart={updateCart}
                removeFromCart={removeFromCart}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />

        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delivery" element={<Delivery />} />

        {/* ============ POLICY ROUTES ============ */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* ============ AUTH ============ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Orders */}
        <Route
          path="/orders"
          element={user ? <MyOrdersPage /> : <Navigate to="/login" />}
        />

        {/* ============ ADMIN PANEL ============ */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route index element={<Navigate to="products" replace />} />
        </Route>

        {/* ============ 404 PAGE ============ */}
        <Route
          path="*"
          element={
            <div style={{ padding: 80, textAlign: "center" }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>

      <WhatsAppFloat />
      <Footer />
    </>
  );
}
