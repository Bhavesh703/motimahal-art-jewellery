import "../styles/sections.css";

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-item">
        <img src="/icons/delivery-time.png" alt="Free Delivery" />
        <p>Free Delivery</p>
      </div>

      <div className="trust-item">
        <img src="/icons/return-purchase.png" alt="Easy Returns" />
        <p>Easy Returns</p>
      </div>

      <div className="trust-item">
        <img src="/icons/guranted.png" alt="Authentic Jewellery" />
        <p>Authentic Jewellery</p>
      </div>

      <div className="trust-item">
        <img src="/icons/headset.png  " alt="WhatsApp Support" />
        <p>WhatsApp Support</p>
      </div>
    </section>
  );
}
