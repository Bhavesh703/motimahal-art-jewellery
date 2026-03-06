import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiChevronDown,
  FiLogOut,
  FiPackage,
  FiSettings,
} from "react-icons/fi";
import logo from "../assets/LOGO1.png";
import "../styles/navbar.css";

export default function Navbar({ cartCount, wishlistCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout, isAdmin } = useAuth();
  const dropdownRef = useRef(null);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* Announcement */}
      <div className="top-announcement">
        ✨ Celebrate Every Occasion with Exquisite Jhumkas & Necklaces ✨
      </div>

      <nav className="navbar container">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMobile}>
          <img src={logo} alt="Moti Mahal Art Jewellery" />
          <span>Moti Mahal Art Jewellery</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* COLLECTIONS */}
          <li className="has-mega">
            <span>
              Collections <FiChevronDown size={14} />
            </span>

            <div className="mega-menu">
              <div className="mega-column">
                <h4>Earrings</h4>
                <Link to="/category/indian-jhumka">Indian Jhumka</Link>
                <Link to="/category/western-earrings">Western Earrings</Link>
                <Link to="/category/bengal-jewellery">Bengal Jewellery</Link>
              </div>

              <div className="mega-column">
                <h4>Neckwear</h4>
                <Link to="/category/necklaces">Necklaces</Link>
              </div>

              <div className="mega-column image-column">
                <img src={logo} alt="Jewellery Collection" />
                <p>Tradition Meets Trend</p>
              </div>
            </div>
          </li>

          <li>
            <Link to="/new-arrivals">New Arrivals</Link>
          </li>

          <li>
            <Link to="/search">Search</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">
          {/* Wishlist */}
          <Link to="/wishlist" className="icon-btn">
            <FiHeart />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="icon-btn">
            <FiShoppingBag />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          {/* USER */}
          {user ? (
            <div className="user-wrapper" ref={dropdownRef}>
              <div
                className="user-avatar"
                onClick={() => setUserOpen(!userOpen)}
              >
                {user.email?.charAt(0).toUpperCase()}
              </div>

              {userOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <strong>{user.email}</strong>
                  </div>

                  {/* ADMIN PANEL */}
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setUserOpen(false)}>
                      <FiSettings /> Admin Panel
                    </Link>
                  )}

                  <Link to="/orders" onClick={() => setUserOpen(false)}>
                    <FiPackage /> My Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setUserOpen(false);
                    }}
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/signup" className="signup-btn">
                Create Account
              </Link>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMobile}>
            Home
          </Link>

          <strong>Collections</strong>

          <Link to="/category/indian-jhumka" onClick={closeMobile}>
            Indian Jhumka
          </Link>

          <Link to="/category/western-earrings" onClick={closeMobile}>
            Western Earrings
          </Link>

          <Link to="/category/bengal-jewellery" onClick={closeMobile}>
            Bengal Jewellery
          </Link>

          <Link to="/category/necklaces" onClick={closeMobile}>
            Necklaces
          </Link>

          <Link to="/new-arrivals" onClick={closeMobile}>
            New Arrivals
          </Link>

          <Link to="/search" onClick={closeMobile}>
            Search
          </Link>

          <Link to="/contact" onClick={closeMobile}>
            Contact
          </Link>

          {!user && (
            <>
              <Link to="/login" onClick={closeMobile}>
                Login
              </Link>

              <Link to="/signup" onClick={closeMobile}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
