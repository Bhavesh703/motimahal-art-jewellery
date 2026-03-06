import PolicyLayout from "../components/PolicyLayout";

export default function Returns() {
  return (
    <PolicyLayout title="Return & Refund Policy">
      <p>We want you to be completely satisfied with your purchase.</p>

      <h3>Return Eligibility</h3>
      <ul>
        <li>Return request must be raised within 7 days of delivery.</li>
        <li>Product must be unused and in original packaging.</li>
        <li>Customized or sale items are non-returnable.</li>
      </ul>

      <h3>Refund Process</h3>
      <p>
        Refunds are processed within 5–7 business days after product inspection.
      </p>

      <h3>Non-Returnable Items</h3>
      <p>
        Earrings and hygiene-sensitive items cannot be returned for safety
        reasons.
      </p>
    </PolicyLayout>
  );
}
