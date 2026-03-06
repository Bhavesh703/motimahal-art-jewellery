import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

const slides = [
  {
    type: "image",
    src: "/hero/slider3.jpeg",
    // title: "Timeless Jewellery",
    // subtitle: "Crafted in gold. Designed for elegance.",
    link: "/category/necklaces",
  },
  {
    type: "image",
    src: "/hero/slider1.jpeg",
    // title: "Western Luxury Collection",
    // subtitle: "Modern beauty for every occasion.",
    link: "/category/western-earrings",
  },
  {
    type: "image",
    src: "/hero/slider2.jpeg",
    // title: "Neckless Heritage Designs",
    // subtitle: "Tradition woven in gold.",
    link: "/category/bengal-jewellery",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="hero">
      {/* Sparkles */}
      <div className="sparkle-layer">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="sparkle" />
        ))}
      </div>

      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="hero-bg"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={slide.src}
            alt={slide.title}
            loading="eager"
            className="hero-image"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="hero-overlay">
        <motion.h1
          key={slide.title}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {slide.title}
        </motion.h1>

        <motion.p
          key={slide.subtitle}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {slide.subtitle}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hero-btn"
          onClick={() => navigate(slide.link)}
        >
          Explore Collection →
        </motion.button>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
