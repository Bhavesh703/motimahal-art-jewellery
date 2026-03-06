import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/sections.css";

const categories = [
  {
    title: "Indian Jhumka",
    slug: "indian-jhumka",
    image: "/collections/Jhumki.png",
  },
  {
    title: "Western Earrings",
    slug: "western-earrings",
    image: "/collections/Western.png",
  },
  {
    title: "Bengal Jewellery",
    slug: "bengal-jewellery",
    image: "/collections/Bangal.jpg",
  },
  {
    title: "Necklaces",
    slug: "necklaces",
    image: "/collections/neckles.png",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="container">
      <h2 className="section-title">Explore Our Collections</h2>

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
            <Link to={`/category/${cat.slug}`}>
              <img src={cat.image} alt={cat.title} />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
