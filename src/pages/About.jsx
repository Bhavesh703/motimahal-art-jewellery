import { motion } from "framer-motion";
import "../styles/about.css";
import logo from "../assets/LOGO1.png";

export default function About() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>About Moti Mahal Art Jewellery</h1>
          <p>
            Where tradition meets elegance. We craft timeless jewellery that
            celebrates beauty, culture and individuality.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="about-section container">
        <div className="about-grid">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Moti Mahal Jewellery" />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Story</h2>
            <p>
              Moti Mahal Art Jewellery was founded with a vision to bring
              together traditional Indian artistry and modern fashion. Each
              piece in our collection reflects the beauty of Indian culture
              while staying stylish for today’s generation.
            </p>

            <p>
              From elegant jhumkas to statement necklaces, every design is
              crafted with attention to detail and passion for jewellery. Our
              goal is to help every woman feel confident, beautiful, and unique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <h2>Why Choose Us</h2>

          <div className="values-grid">
            <div className="value-card">
              <h3>Premium Quality</h3>
              <p>
                Our jewellery is crafted using high quality materials to ensure
                durability and long-lasting shine.
              </p>
            </div>

            <div className="value-card">
              <h3>Unique Designs</h3>
              <p>
                Our collections are inspired by traditional Indian heritage
                combined with modern fashion trends.
              </p>
            </div>

            <div className="value-card">
              <h3>Affordable Luxury</h3>
              <p>
                We believe everyone deserves luxury jewellery without paying
                extremely high prices.
              </p>
            </div>

            <div className="value-card">
              <h3>Trusted Brand</h3>
              <p>
                Hundreds of happy customers trust Moti Mahal Art Jewellery for
                their special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Explore Our Collection</h2>
          <p>
            Discover handcrafted jewellery designed to make every occasion
            unforgettable.
          </p>

          <a href="/new-arrivals" className="cta-btn">
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}
