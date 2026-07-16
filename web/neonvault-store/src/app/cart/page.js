'use client';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/data/products';
import { IconTrash, IconMinus, IconPlus, IconArrowRight, IconShield, IconCart } from '@/components/Icons';
import styles from './page.module.css';

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  const shipping = subtotal >= 99900 ? 0 : 9900;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className="container">
          <div className={styles.emptyContent}>
            <div className={styles.emptyIcon}><IconCart size={48} /></div>
            <h1 className={styles.emptyTitle}>Your Vault is Empty</h1>
            <p className={styles.emptyDesc}>Looks like you haven&apos;t added any collectibles yet.</p>
            <Link href="/products" className="btn btn-primary btn-lg" id="shop-now-btn">
              Explore Collection <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Your Cart</h1>
          <span className={styles.count}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.itemsSection}>
            {items.map((item, i) => (
              <div key={item.id} className={styles.cartItem} style={{ animationDelay: `${i * 80}ms` }}>
                <div className={styles.itemImage}>
                  <div className={styles.itemPlaceholder}>
                    <span style={{ fontSize: '2rem' }}>⚡</span>
                  </div>
                </div>
                <div className={styles.itemDetails}>
                  <Link href={`/products/${item.slug}`} className={styles.itemName}>{item.name}</Link>
                  <div className={styles.itemPrices}>
                    <span className="price">{formatPrice(item.price)}</span>
                    {item.compareAtPrice && <span className="price-original">{formatPrice(item.compareAtPrice)}</span>}
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.qtyControl}>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)} id={`qty-dec-${item.id}`}>
                      <IconMinus size={14} />
                    </button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)} id={`qty-inc-${item.id}`}>
                      <IconPlus size={14} />
                    </button>
                  </div>
                  <span className={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</span>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Remove" id={`remove-${item.id}`}>
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
            <button className={styles.clearBtn} onClick={clearCart} id="clear-cart-btn">Clear Cart</button>
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal ({itemCount} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--color-success)' : undefined }}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              {shipping > 0 && (
                <p className={styles.freeShipNote}>
                  Add {formatPrice(99900 - subtotal)} more for free shipping
                </p>
              )}

              <div className={styles.divider} />

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span className={styles.totalAmount}>{formatPrice(total)}</span>
              </div>

              {/* Coupon */}
              <div className={styles.couponSection}>
                <input type="text" placeholder="Coupon code" className="input-field" id="coupon-input" />
                <button className="btn btn-secondary btn-sm" id="apply-coupon-btn">Apply</button>
              </div>

              <Link href="/login" className={`btn btn-primary btn-lg ${styles.checkoutBtn}`} id="checkout-btn">
                Proceed to Checkout <IconArrowRight size={18} />
              </Link>

              <div className={styles.secureNote}>
                <IconShield size={14} style={{ color: 'var(--color-success)' }} />
                <span>Secure checkout with Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
