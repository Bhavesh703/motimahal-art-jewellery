import PolicyLayout from "../components/PolicyLayout";

export default function Shipping() {
  return (
    <PolicyLayout title="Shipping Policy">
      <h3>Order Processing</h3>
      <p>
        Orders are processed within 1–3 working days after payment confirmation.
      </p>

      <h3>Delivery Timeline</h3>
      <p>
        Delivery typically takes 4–7 business days depending on your location.
      </p>

      <h3>Shipping Charges</h3>
      <p>We offer free shipping on all prepaid orders.</p>

      <h3>Order Tracking</h3>
      <p>Tracking details will be shared via email or WhatsApp once shipped.</p>
    </PolicyLayout>
  );
}
