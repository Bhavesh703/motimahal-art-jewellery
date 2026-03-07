import "../styles/sections.css";
import { FiInstagram } from "react-icons/fi";

const posts = [
  {
    id: 1,
    img: "/collections/insta/post1.png",
  },
  {
    id: 2,
    img: "/collections/insta/post2.jpeg",
  },
  {
    id: 3,
    img: "/collections/insta/post3.jpeg",
  },
  {
    id: 4,
    img: "/collections/Jhumki.png",
  },
  {
    id: 5,
    img: "/collections/Western.png",
  },
  {
    id: 6,
    img: "/collections/neckles.png",
  },
];

export default function Instagram() {
  return (
    <section className="container instagram-section">
      <h2 className="section-title">Follow Us on Instagram</h2>

      <div className="insta-grid">
        {posts.map((post) => (
          <a
            key={post.id}
            href="https://www.instagram.com/moti_mahal_art_jewellery/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-card"
          >
            <img src={post.img} alt="Instagram post" />

            <div className="insta-overlay">
              <FiInstagram size={28} />
            </div>
          </a>
        ))}
      </div>

      <div className="insta-btn">
        <a
          href="https://www.instagram.com/moti_mahal_art_jewellery/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow @motimahalartjewellery
        </a>
      </div>
    </section>
  );
}
