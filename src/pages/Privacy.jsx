import PolicyLayout from "../components/PolicyLayout";

export default function Privacy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>
        We value your privacy and are committed to protecting your personal
        information.
      </p>

      <h3>Information We Collect</h3>
      <p>
        Name, email, phone number and address are collected only for order
        processing.
      </p>

      <h3>Payment Security</h3>
      <p>
        Payments are securely processed via Razorpay. We do not store card
        details.
      </p>

      <h3>Data Protection</h3>
      <p>
        Your information is never sold or shared with third parties except for
        shipping and payment processing.
      </p>
    </PolicyLayout>
  );
}
