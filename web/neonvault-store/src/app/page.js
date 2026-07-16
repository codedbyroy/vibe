'use client';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products, formatPrice, getFeaturedProducts } from '@/data/products';
import { IconArrowRight, IconZap, IconShield, IconTruck, IconRefreshCw, IconStar } from '@/components/Icons';
import styles from './page.module.css';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero} id="hero-section">
        {/* Particle BG */}
        <div className={styles.heroBg}>
          <div className={styles.particle} style={{ '--tx': '120px', '--ty': '-180px', left: '10%', top: '60%', animationDelay: '0s' }} />
          <div className={styles.particle} style={{ '--tx': '-80px', '--ty': '-220px', left: '25%', top: '70%', animationDelay: '0.5s' }} />
          <div className={styles.particle} style={{ '--tx': '200px', '--ty': '-150px', left: '50%', top: '80%', animationDelay: '1s' }} />
          <div className={styles.particle} style={{ '--tx': '-150px', '--ty': '-200px', left: '70%', top: '65%', animationDelay: '1.5s' }} />
          <div className={styles.particle} style={{ '--tx': '100px', '--ty': '-250px', left: '85%', top: '75%', animationDelay: '2s' }} />
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <IconZap size={14} />
              <span>Premium Anime Collectibles</span>
            </div>
            <h1 className={styles.heroTitle}>
              Your <span className={styles.heroGradient}>Anime</span> Collection{' '}
              <span className={styles.heroGradient2}>Deserves</span> Better
            </h1>
            <p className={styles.heroDesc}>
              Hand-picked LED figurines, moon lamps, and limited-edition statues from your favorite anime universes. Each piece is a masterpiece.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products" className="btn btn-primary btn-lg" id="hero-cta">
                Explore Collection
                <IconArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn btn-secondary btn-lg" id="hero-secondary">
                Our Story
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>500+</span>
                <span className={styles.statLabel}>Happy Collectors</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>4.9</span>
                <span className={styles.statLabel}>Avg Rating</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Authentic</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardContent}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: 'var(--space-4)' }}>⚡</span>
                <span className={styles.heroCardTitle}>Gear 5 Luffy</span>
                <span className={styles.heroCardSub}>Moon Lamp — 28cm</span>
                <span className={styles.heroCardPrice}>{formatPrice(199900)}</span>
              </div>
              <div className={styles.heroCardGlow} />
            </div>
          </div>
        </div>

        <div className={styles.heroScrollIndicator}>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className={`section ${styles.featured}`} id="featured-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>CURATED</span>
              <h2 className="section-title">Featured <span className={styles.heroGradient}>Drops</span></h2>
              <p className="section-subtitle">Hand-selected masterpieces from our vault. Every piece tells a story.</p>
            </div>
            <Link href="/products" className="btn btn-secondary" id="view-all-products">
              View All
              <IconArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.productsGrid}>
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL PRODUCTS ===== */}
      <section className={`section ${styles.allProducts}`} id="all-products-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>COLLECTION</span>
              <h2 className="section-title">Complete <span className={styles.heroGradient2}>Arsenal</span></h2>
              <p className="section-subtitle">Browse our entire collection of premium anime collectibles.</p>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className={`section ${styles.whyUs}`} id="why-us-section">
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTag}>WHY NEONVAULT</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Built for <span className={styles.heroGradient}>True</span> Collectors</h2>
          </div>

          <div className={styles.whyGrid}>
            {[
              {
                icon: <IconShield size={28} />,
                title: '100% Authentic',
                desc: 'Every item is verified and sourced directly from licensed manufacturers. No knockoffs, ever.',
                color: 'var(--color-success)',
              },
              {
                icon: <IconTruck size={28} />,
                title: 'Free Shipping',
                desc: 'Free delivery across India on all orders above ₹999. Carefully packaged to arrive pristine.',
                color: 'var(--color-secondary)',
              },
              {
                icon: <IconRefreshCw size={28} />,
                title: '7-Day Returns',
                desc: 'Not satisfied? Easy 7-day return window with full refund. No questions asked.',
                color: 'var(--color-primary)',
              },
              {
                icon: <IconStar size={28} />,
                title: 'Collector Grade',
                desc: 'Premium packaging, numbered editions, and certificate of authenticity on select pieces.',
                color: 'var(--color-warning)',
              },
            ].map((item, i) => (
              <div key={i} className={styles.whyCard} style={{ animationDelay: `${i * 100}ms` }}>
                <div className={styles.whyIcon} style={{ color: item.color, background: `${item.color}15` }}>
                  {item.icon}
                </div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className={`section ${styles.newsletter}`} id="newsletter-section">
        <div className="container">
          <div className={styles.nlCard}>
            <div className={styles.nlContent}>
              <h2 className={styles.nlTitle}>Join the <span className={styles.heroGradient}>Vault</span></h2>
              <p className={styles.nlDesc}>Be the first to know about new drops, exclusive deals, and limited-edition releases.</p>
              <div className={styles.nlForm}>
                <input type="email" placeholder="your@email.com" className={`input-field ${styles.nlInput}`} id="newsletter-email" />
                <button className="btn btn-primary" id="newsletter-submit">Subscribe</button>
              </div>
              <p className={styles.nlDisclaimer}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
