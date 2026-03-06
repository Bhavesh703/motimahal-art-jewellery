import "../styles/sections.css";

const features = [
  {
    icon: "/icons/guranted.png",
    title: "Authentic Jewellery",
    desc: "100% certified & premium quality",
  },
  {
    icon: "/icons/delivery-time.png",
    title: "Free Shipping",
    desc: "Safe & fast delivery",
  },
  {
    icon: "/icons/return-purchase.png",
    title: "Easy Returns",
    desc: "Hassle-free returns policy",
  },
  {
    icon: "/icons/headset.png",
    title: "Customer Support",
    desc: "Dedicated jewellery experts",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="why-section">
      {features.map((f) => (
        <div key={f.title} className="why-card">
          <img src={f.icon} />
          <h4>{f.title}</h4>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
