import "../styles/sections.css";

export default function Delivery() {
  return (
    <section className="container" style={{ padding: "40px 0" }}>
      <h2 className="section-title">Shipping & Delivery</h2>

      <div style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
        <h3>Shipping Time</h3>
        <p>• Ready pieces: 3–7 working days</p>
        <p>• Custom / bridal sets: 10–15 working days</p>

        <h3>Packaging</h3>
        <p>All jewellery is shipped in premium, tamper-proof packaging.</p>

        <h3>Tracking</h3>
        <p>
          You will receive a tracking link via WhatsApp / Email once shipped.
        </p>

        <h3>Returns</h3>
        <p>
          Returns are accepted within 7 days of delivery for unused items with
          original packaging. Contact us for return approval.
        </p>
      </div>
    </section>
  );
}
