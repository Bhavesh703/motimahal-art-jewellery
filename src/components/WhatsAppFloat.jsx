import { FaWhatsapp } from "react-icons/fa";
import "../styles/whatsapp.css";

export default function WhatsAppFloat() {
  const phone = "7710013125"; // 👉 Replace with your real number (with country code)

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} />
      <span className="whatsapp-tooltip">Chat with us</span>
    </a>
  );
}
