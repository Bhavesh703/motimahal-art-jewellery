import "../styles/sections.css";

export default function Contact() {
  return (
    <section className="container" style={{ padding: "40px 0" }}>
      <h2 className="section-title">Contact & Enquiries</h2>

      <p style={{ maxWidth: 600, margin: "0 auto 20px", textAlign: "center" }}>
        Have a question or want to order a custom piece? Send us a message and
        we’ll get back to you shortly.
      </p>

      <form
        className="contact-form"
        action="https://formspree.io/f/mjgabgze"
        method="POST"
      >
        <input name="name" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" placeholder="Phone Number" required />
        <textarea
          name="message"
          placeholder="Your message or product enquiry"
          required
        />

        <button type="submit" className="btn-gold">
          Send Message
        </button>
      </form>
    </section>
  );
}
