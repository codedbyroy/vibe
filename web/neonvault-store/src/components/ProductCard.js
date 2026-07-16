'use client';
import Link from 'next/link';
import { IconStar, IconCart, IconEye } from '@/components/Icons';
import { formatPrice, getDiscountPercent } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const isLowStock = product.stockQuantity <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);

    // Quick flash animation
    const btn = e.currentTarget;
    btn.classList.add(styles.added);
    setTimeout(() => btn.classList.remove(styles.added), 800);
  };

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 100}ms` }}
      id={`product-card-${product.slug}`}
    >
      {/* Image Area */}
      <Link href={`/products/${product.slug}`} className={styles.imageWrap}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.placeholderEmoji}>
            {product.category === 'LED Lamps' ? '💡' : product.category === 'Premium Statues' ? '🏆' : '⚔️'}
          </span>
          <span className={styles.placeholderName}>{product.name}</span>
        </div>
        {/* Badges */}
        <div className={styles.badges}>
          {discount > 0 && (
            <span className={styles.discountBadge}>-{discount}%</span>
          )}
          {isLowStock && (
            <span className={styles.stockBadge}>Only {product.stockQuantity} left</span>
          )}
        </div>
        {/* Hover Actions */}
        <div className={styles.hoverActions}>
          <button className={styles.quickView} aria-label="Quick View">
            <IconEye size={18} />
          </button>
        </div>
        {/* Glow Effect */}
        <div className={styles.glowEffect} />
      </Link>

      {/* Info */}
      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>
        <Link href={`/products/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.shortDesc}>{product.shortDescription}</p>

        {/* Rating */}
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => (
              <IconStar key={i} size={14} filled={i <= Math.round(product.rating)} style={{ color: i <= Math.round(product.rating) ? '#FFD600' : 'var(--text-muted)' }} />
            ))}
          </div>
          <span className={styles.ratingText}>{product.rating} ({product.reviewCount})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className="price" style={{ fontSize: 'var(--text-xl)' }}>{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="price-original">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          <button className={styles.addBtn} onClick={handleAddToCart} aria-label="Add to Cart" id={`add-cart-${product.slug}`}>
            <IconCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
