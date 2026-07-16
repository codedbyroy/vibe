'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, formatPrice, getDiscountPercent, products } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';
import { IconStar, IconCart, IconHeart, IconTruck, IconShield, IconRefreshCw, IconCheck, IconMinus, IconPlus, IconChevronRight } from '@/components/Icons';
import styles from './page.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="btn btn-primary">Back to Collection</Link>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const stockPercent = Math.min((product.stockQuantity / 30) * 100, 100);
  const related = products.filter(p => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} id="breadcrumb">
          <Link href="/">Home</Link>
          <IconChevronRight size={14} />
          <Link href="/products">Collection</Link>
          <IconChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className={styles.productGrid}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <div className={styles.imagePlaceholder}>
                <span style={{ fontSize: '5rem' }}>
                  {product.category === 'LED Lamps' ? '💡' : product.category === 'Premium Statues' ? '🏆' : '⚔️'}
                </span>
                <span className={styles.imgLabel}>{product.name}</span>
                <span className={styles.imgSub}>Image {activeImage + 1} of {product.images.length}</span>
              </div>
              {discount > 0 && <span className={styles.discBadge}>-{discount}% OFF</span>}
            </div>
            <div className={styles.thumbnails}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <span style={{ fontSize: '1.5rem' }}>
                    {product.category === 'LED Lamps' ? '💡' : product.category === 'Premium Statues' ? '🏆' : '⚔️'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className={styles.details}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(i => (
                  <IconStar key={i} size={16} filled={i <= Math.round(product.rating)} style={{ color: i <= Math.round(product.rating) ? '#FFD600' : 'var(--text-muted)' }} />
                ))}
              </div>
              <span className={styles.ratingText}>{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.priceMain}>{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className={styles.priceOld}>{formatPrice(product.compareAtPrice)}</span>
                  <span className={styles.saveBadge}>Save {formatPrice(product.compareAtPrice - product.price)}</span>
                </>
              )}
            </div>
            <p className={styles.taxNote}>Inclusive of all taxes. Free shipping above ₹999.</p>

            {/* Stock Meter */}
            <div className={styles.stockSection}>
              <div className={styles.stockBar}>
                <div
                  className={styles.stockFill}
                  style={{
                    width: `${stockPercent}%`,
                    background: stockPercent > 50 ? 'var(--color-success)' : stockPercent > 20 ? 'var(--color-warning)' : 'var(--color-error)',
                  }}
                />
              </div>
              <span className={styles.stockText}>
                {product.stockQuantity <= 5 ? (
                  <span style={{ color: 'var(--color-error)' }}>Only {product.stockQuantity} left — order soon!</span>
                ) : (
                  <span style={{ color: 'var(--color-success)' }}>In Stock ({product.stockQuantity} available)</span>
                )}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className={styles.addSection}>
              <div className={styles.qtyControl}>
                <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))} id="qty-minus">
                  <IconMinus size={16} />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button className={styles.qtyBtn} onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} id="qty-plus">
                  <IconPlus size={16} />
                </button>
              </div>
              <button
                className={`btn btn-primary btn-lg ${styles.addBtn} ${addedAnimation ? styles.addedAnim : ''}`}
                onClick={handleAdd}
                id="add-to-cart-btn"
              >
                {addedAnimation ? (
                  <><IconCheck size={20} /> Added to Cart</>
                ) : (
                  <><IconCart size={20} /> Add to Cart — {formatPrice(product.price * quantity)}</>
                )}
              </button>
              <button className={`btn btn-secondary ${styles.wishBtn}`} aria-label="Wishlist" id="wishlist-btn">
                <IconHeart size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <IconTruck size={18} style={{ color: 'var(--color-secondary)' }} />
                <span>Free Shipping</span>
              </div>
              <div className={styles.trustItem}>
                <IconShield size={18} style={{ color: 'var(--color-success)' }} />
                <span>Secure Payment</span>
              </div>
              <div className={styles.trustItem}>
                <IconRefreshCw size={18} style={{ color: 'var(--color-primary)' }} />
                <span>7-Day Returns</span>
              </div>
            </div>

            {/* Description */}
            <div className={styles.descSection}>
              <h3 className={styles.descTitle}>About This Piece</h3>
              <p className={styles.descText}>{product.description}</p>
            </div>

            {/* Features */}
            <div className={styles.featuresSection}>
              <h3 className={styles.descTitle}>Features</h3>
              <ul className={styles.featureList}>
                {product.features.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <IconCheck size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className={styles.specs}>
              <h3 className={styles.descTitle}>Specifications</h3>
              <div className={styles.specGrid}>
                <div className={styles.specItem}><span>Weight</span><strong>{product.weightGrams}g</strong></div>
                <div className={styles.specItem}><span>Height</span><strong>{product.dimensions.height}cm</strong></div>
                <div className={styles.specItem}><span>Width</span><strong>{product.dimensions.width}cm</strong></div>
                <div className={styles.specItem}><span>Length</span><strong>{product.dimensions.length}cm</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className="section-title">You Might Also Like</h2>
            <div className={styles.relatedGrid}>
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
