import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/sections.css";

const categories = [
  {
    name: "Indian Jhumka",
    slug: "indian-jhumka",
    img: "/collections/bridal.jpg",
  },
  {
    name: "Western Earrings",
    slug: "western-earrings",
    img: "/collections/western.jpg",
  },
  {
    name: "Bengal Jewellery",
    slug: "bengal-jewellery",
    img: "/collections/bengal.jpg",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    img: "/collections/necklaces.jpg",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="container category-showcase">
      <div className="section-header">
        <h2 className="section-title">Shop by Collection</h2>
        <p>Explore our most loved jewellery categories</p>
      </div>

      <div className="category-grid">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            className="category-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            {/* ✅ FIXED LINK */}
            <Link to={`/category/${cat.slug}`}>
              <div className="image-wrapper">
                <img src={cat.img} alt={cat.name} />
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                  <span>Shop Now →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
