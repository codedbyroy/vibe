import styles from './page.module.css';

export const metadata = {
  title: 'Policies — NeonVault',
  description: 'Shipping, returns, privacy, and terms of service for NeonVault.',
};

export default function PoliciesPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>Store Policies</h1>

        <div className={styles.policyGrid}>
          {/* Shipping */}
          <section className={styles.policyCard} id="shipping-policy">
            <h2 className={styles.policyTitle}>📦 Shipping Policy</h2>
            <div className={styles.policyContent}>
              <p><strong>Free shipping</strong> on all orders above ₹999 across India.</p>
              <p>Orders below ₹999 carry a flat ₹99 shipping fee.</p>
              <p><strong>Processing time:</strong> 1-2 business days after payment confirmation.</p>
              <p><strong>Delivery time:</strong> 3-7 business days depending on your location.</p>
              <p>All orders are shipped via our logistics partners (Delhivery, BlueDart, etc.) through Shiprocket. You will receive a tracking number via email once your order is shipped.</p>
              <p>We currently ship only within India. International shipping coming soon.</p>
            </div>
          </section>

          {/* Returns */}
          <section className={styles.policyCard} id="return-policy">
            <h2 className={styles.policyTitle}>↩️ Return & Refund Policy</h2>
            <div className={styles.policyContent}>
              <p>We offer a <strong>7-day return window</strong> from the date of delivery.</p>
              <p><strong>Eligible for return:</strong> Damaged items, wrong products, products not matching description.</p>
              <p><strong>Not eligible:</strong> Change of mind after 7 days, items without original packaging, used/displayed items with visible wear.</p>
              <p><strong>Refund process:</strong> Once we receive and inspect the returned item, refund will be processed to your original payment method within 5-7 business days.</p>
              <p>To request a return, go to My Orders → select the order → Request Return.</p>
            </div>
          </section>

          {/* Privacy */}
          <section className={styles.policyCard} id="privacy-policy">
            <h2 className={styles.policyTitle}>🔒 Privacy Policy</h2>
            <div className={styles.policyContent}>
              <p>We collect only the information necessary to process your orders: name, email, phone number, and shipping address.</p>
              <p>Your payment information is processed securely by Razorpay. We never store your card details.</p>
              <p>We do not sell, trade, or share your personal information with third parties except for order fulfillment (delivery partners).</p>
              <p>We use cookies to improve your shopping experience. You can disable cookies in your browser settings.</p>
              <p>For data deletion requests, contact us at <a href="mailto:privacy@neonvault.in" style={{ color: 'var(--color-secondary)' }}>privacy@neonvault.in</a></p>
            </div>
          </section>

          {/* Terms */}
          <section className={styles.policyCard} id="terms-policy">
            <h2 className={styles.policyTitle}>📋 Terms of Service</h2>
            <div className={styles.policyContent}>
              <p>By using NeonVault, you agree to these terms. We reserve the right to refuse service to anyone.</p>
              <p>All products are subject to availability. We reserve the right to limit quantities.</p>
              <p>Prices are listed in Indian Rupees (INR) and include all applicable taxes (GST).</p>
              <p>Product images are representative. Minor variations in color and finish may occur due to manufacturing processes.</p>
              <p>We are not responsible for delays caused by courier partners or force majeure events.</p>
              <p>For any disputes, the jurisdiction will be courts in Noida, Uttar Pradesh, India.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
