import "../styles/sections.css";

const posts = [1, 2, 3, 4, 5, 6];

export default function Instagram() {
  return (
    <div className="container">
      <h2 className="section-title">Follow Us on Instagram</h2>

      <div className="insta-grid">
        {posts.map((p) => (
          <div key={p} className="insta-card">
            <img src={`/collections/Western.png`} />
          </div>
        ))}
      </div>
    </div>
  );
}
