'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockOrders, statusConfig } from '@/data/orders';
import { formatPrice } from '@/data/products';
import { IconChevronLeft, IconCheck, IconTruck, IconPackage, IconRefreshCw, IconMapPin } from '@/components/Icons';
import styles from './page.module.css';

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = mockOrders.find(o => o.id === id);
  const [showReturnForm, setShowReturnForm] = useState(false);

  if (!order) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Order Not Found</h1>
          <Link href="/orders" className="btn btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  const config = statusConfig[order.status] || { label: order.status, color: 'info' };
  const isDelivered = order.status === 'delivered';
  const returnWindowOpen = isDelivered && order.returnWindowEnds && new Date(order.returnWindowEnds) > new Date();
  const daysLeft = returnWindowOpen ? Math.ceil((new Date(order.returnWindowEnds) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/orders" className={styles.backLink} id="back-to-orders">
          <IconChevronLeft size={18} /> Back to Orders
        </Link>

        <div className={styles.header}>
          <div>
            <h1 className={styles.orderNum}>{order.orderNumber}</h1>
            <p className={styles.orderDate}>Placed {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <span className={`badge badge-${config.color} ${styles.statusBadge}`}>{config.label}</span>
        </div>

        <div className={styles.layout}>
          {/* Main Content */}
          <div className={styles.mainCol}>
            {/* Timeline */}
            <div className={styles.timelineCard}>
              <h2 className={styles.cardTitle}><IconTruck size={20} /> Order Tracking</h2>
              {order.trackingNumber && (
                <p className={styles.trackingInfo}>
                  {order.courierName} — <span className={styles.awb}>{order.trackingNumber}</span>
                </p>
              )}
              <div className={styles.timeline}>
                {order.timeline.map((step, i) => (
                  <div key={i} className={`${styles.timelineStep} ${step.done ? styles.stepDone : ''} ${order.timeline[i+1] && !order.timeline[i+1].done && step.done ? styles.stepCurrent : ''}`}>
                    <div className={styles.stepDot}>
                      {step.done && <IconCheck size={12} />}
                    </div>
                    <div className={styles.stepContent}>
                      <span className={styles.stepLabel}>{step.label}</span>
                      {step.time && (
                        <span className={styles.stepTime}>
                          {new Date(step.time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {new Date(step.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    {i < order.timeline.length - 1 && <div className={`${styles.stepLine} ${step.done ? styles.lineDone : ''}`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className={styles.itemsCard}>
              <h2 className={styles.cardTitle}><IconPackage size={20} /> Order Items</h2>
              {order.items.map((item, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemImg}><span style={{ fontSize: '1.5rem' }}>⚡</span></div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            {/* Return Section */}
            {returnWindowOpen && (
              <div className={styles.returnCard}>
                <div className={styles.returnHeader}>
                  <div>
                    <h2 className={styles.cardTitle}><IconRefreshCw size={20} /> Return Window</h2>
                    <p className={styles.returnCountdown}>
                      <span className={styles.daysLeft}>{daysLeft}</span> day{daysLeft !== 1 ? 's' : ''} remaining
                    </p>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setShowReturnForm(!showReturnForm)} id="request-return-btn">
                    Request Return
                  </button>
                </div>
                {/* Return Progress Bar */}
                <div className={styles.returnBar}>
                  <div className={styles.returnFill} style={{ width: `${((7 - daysLeft) / 7) * 100}%` }} />
                </div>

                {showReturnForm && (
                  <div className={styles.returnForm}>
                    <h3>Why are you returning?</h3>
                    <div className={styles.returnReasons}>
                      {['Damaged in transit', 'Wrong item received', 'Product not as described', 'Changed my mind', 'Other'].map(reason => (
                        <label key={reason} className={styles.reasonOption}>
                          <input type="radio" name="return-reason" value={reason} />
                          <span>{reason}</span>
                        </label>
                      ))}
                    </div>
                    <textarea className="input-field" placeholder="Additional details (optional)" rows={3} id="return-details" style={{ resize: 'vertical' }} />
                    <div className={styles.returnActions}>
                      <button className="btn btn-secondary" onClick={() => setShowReturnForm(false)}>Cancel</button>
                      <button className="btn btn-accent" id="submit-return-btn">Submit Return Request</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Price Summary */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Payment Summary</h3>
              <div className={styles.summaryRow}><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className={styles.summaryRow}><span>Shipping</span><span style={{ color: order.shipping === 0 ? 'var(--color-success)' : undefined }}>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span></div>
              <div className={styles.summaryRow}><span>Tax (GST)</span><span>{formatPrice(order.tax)}</span></div>
              <div className={styles.divider} />
              <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span className="price" style={{ fontSize: 'var(--text-xl)' }}>{formatPrice(order.total)}</span></div>
              <span className="badge badge-success" style={{ marginTop: 'var(--space-3)' }}>Paid via Razorpay</span>
            </div>

            {/* Shipping Address */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}><IconMapPin size={16} /> Shipping Address</h3>
              <p className={styles.addrText}><strong>{order.shippingAddress.fullName}</strong></p>
              <p className={styles.addrText}>{order.shippingAddress.addressLine1}</p>
              <p className={styles.addrText}>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p className={styles.addrText}>{order.shippingAddress.pincode}</p>
              <p className={styles.addrText} style={{ color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>{order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
