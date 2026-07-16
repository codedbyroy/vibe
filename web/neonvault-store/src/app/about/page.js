import Link from 'next/link';
import { IconZap, IconArrowRight } from '@/components/Icons';
import styles from './page.module.css';

export const metadata = {
  title: 'About — NeonVault',
  description: 'The story behind India\'s premium anime collectibles destination.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <span className={styles.heroBadge}><IconZap size={14} /> OUR STORY</span>
          <h1 className={styles.heroTitle}>
            Born from <span className={styles.gradient}>Obsession</span>,<br />
            Built for <span className={styles.gradient2}>Collectors</span>
          </h1>
          <p className={styles.heroDesc}>
            NeonVault started as a passion project by anime fans who were tired of settling for cheap knockoffs and unreliable sellers. We wanted a place where every piece was authentic, every delivery was pristine, and every collector felt valued.
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {[
            { emoji: '🔥', title: 'Passion First', desc: 'We\'re anime fans before we\'re sellers. Every product in our vault is something we\'d proudly display on our own shelves.' },
            { emoji: '✨', title: 'Authenticity Always', desc: 'Zero tolerance for knockoffs. Every piece is sourced from licensed manufacturers and verified before listing.' },
            { emoji: '📦', title: 'Collector-Grade Care', desc: 'Premium packaging designed to protect your collectible from warehouse to doorstep. Because dents and scratches are unacceptable.' },
            { emoji: '💬', title: 'Community Driven', desc: 'Our catalog is shaped by what the community wants. Suggest a piece, and we\'ll hunt it down.' },
          ].map((v, i) => (
            <div key={i} className={styles.valueCard} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={styles.valueEmoji}>{v.emoji}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Collection?</h2>
          <Link href="/products" className="btn btn-primary btn-lg">
            Explore the Vault <IconArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
