import Link from 'next/link';
import { IconWhatsapp, IconInstagram, IconTwitter, IconMail, IconShield, IconTruck, IconRefreshCw } from '@/components/Icons';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="main-footer">
      {/* Trust Badges */}
      <div className={styles.trustBar}>
        <div className={`container ${styles.trustInner}`}>
          <div className={styles.trustItem}>
            <IconTruck size={24} style={{ color: 'var(--color-secondary)' }} />
            <div>
              <strong>Free Shipping</strong>
              <span>On orders above ₹999</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <IconShield size={24} style={{ color: 'var(--color-success)' }} />
            <div>
              <strong>Secure Payments</strong>
              <span>UPI, Cards, Netbanking</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <IconRefreshCw size={24} style={{ color: 'var(--color-primary)' }} />
            <div>
              <strong>7-Day Returns</strong>
              <span>Easy return window</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.footerLogo}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
              <span className={styles.logoText}>NEON<span className={styles.logoAccent}>VAULT</span></span>
            </Link>
            <p className={styles.brandDesc}>
              India&apos;s premium destination for anime collectibles, LED figurines, and limited-edition statues. Every piece tells a story.
            </p>
            <div className={styles.socials}>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp" id="whatsapp-link">
                <IconWhatsapp size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram" id="instagram-link">
                <IconInstagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter" id="twitter-link">
                <IconTwitter size={20} />
              </a>
              <a href="mailto:hello@neonvault.in" className={styles.socialLink} aria-label="Email" id="email-link">
                <IconMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Shop</h4>
            <Link href="/products" className={styles.footerLink}>All Products</Link>
            <Link href="/products?cat=led-lamps" className={styles.footerLink}>LED Lamps</Link>
            <Link href="/products?cat=figurines" className={styles.footerLink}>Figurines</Link>
            <Link href="/products?cat=premium-statues" className={styles.footerLink}>Premium Statues</Link>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Account</h4>
            <Link href="/login" className={styles.footerLink}>Login / Sign Up</Link>
            <Link href="/orders" className={styles.footerLink}>My Orders</Link>
            <Link href="/account" className={styles.footerLink}>My Account</Link>
            <Link href="/cart" className={styles.footerLink}>Cart</Link>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Policies</h4>
            <Link href="/policies/shipping" className={styles.footerLink}>Shipping Policy</Link>
            <Link href="/policies/returns" className={styles.footerLink}>Return & Refund</Link>
            <Link href="/policies/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/policies/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} NeonVault. All rights reserved.
          </p>
          <div className={styles.paymentMethods}>
            <span className={styles.payLabel}>We accept</span>
            <div className={styles.payIcons}>
              <span className={styles.payIcon}>UPI</span>
              <span className={styles.payIcon}>VISA</span>
              <span className={styles.payIcon}>MC</span>
              <span className={styles.payIcon}>RuPay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
