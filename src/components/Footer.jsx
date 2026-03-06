import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        {/* Brand */}
        <div className="footer-col brand-col">
          <h3 className="footer-logo">Moti Mahal Art Jewellery</h3>
          <p>
            Premium Indian & Western jewellery crafted with tradition, elegance
            and timeless beauty.
          </p>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/new-arrivals">New Arrivals</Link>
            <Link to="/search">Search</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Policies */}
        <div className="footer-col">
          <h4>Policies</h4>
          <div className="footer-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/returns">Return & Refund Policy</Link>
            <Link to="/shipping">Shipping Policy</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: motimahalartjewellery25@gmail.com</p>
          <p>WhatsApp: +91-XXXXXXXXXX</p>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Moti Mahal Art Jewellery · All Rights
        Reserved
      </div>
    </footer>
  );
}
