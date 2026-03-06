import "../styles/policy.css";

export default function PolicyLayout({ title, children }) {
  return (
    <section className="policy-wrapper">
      <div className="policy-header">
        <h1>{title}</h1>
        <div className="gold-line"></div>
      </div>

      <div className="policy-card">{children}</div>
    </section>
  );
}
