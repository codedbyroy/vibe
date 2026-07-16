'use client';
import Link from 'next/link';
import { mockOrders, statusConfig } from '@/data/orders';
import { formatPrice } from '@/data/products';
import { IconPackage, IconChevronRight, IconTruck } from '@/components/Icons';
import styles from './page.module.css';

export default function OrdersPage() {
  const orders = mockOrders;

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <div className="container">
          <div className={styles.emptyContent}>
            <IconPackage size={48} style={{ opacity: 0.3 }} />
            <h1>No Orders Yet</h1>
            <p>Start shopping to see your orders here.</p>
            <Link href="/products" className="btn btn-primary btn-lg">Explore Collection</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>My Orders</h1>

        <div className={styles.ordersList}>
          {orders.map((order, i) => {
            const config = statusConfig[order.status] || { label: order.status, color: 'info' };
            return (
              <Link href={`/orders/${order.id}`} key={order.id} className={styles.orderCard} style={{ animationDelay: `${i * 80}ms` }} id={`order-${order.id}`}>
                <div className={styles.orderTop}>
                  <div>
                    <span className={styles.orderNum}>{order.orderNumber}</span>
                    <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <span className={`badge badge-${config.color}`}>{config.label}</span>
                </div>

                <div className={styles.orderItems}>
                  {order.items.map((item, j) => (
                    <div key={j} className={styles.orderItem}>
                      <div className={styles.orderItemImg}>
                        <span style={{ fontSize: '1.2rem' }}>⚡</span>
                      </div>
                      <div className={styles.orderItemInfo}>
                        <span className={styles.orderItemName}>{item.name}</span>
                        <span className={styles.orderItemQty}>Qty: {item.quantity}</span>
                      </div>
                      <span className={styles.orderItemPrice}>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.orderBottom}>
                  <div className={styles.orderTotal}>
                    <span>Total</span>
                    <span className="price">{formatPrice(order.total)}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className={styles.tracking}>
                      <IconTruck size={14} />
                      <span>{order.courierName} — {order.trackingNumber}</span>
                    </div>
                  )}
                  <span className={styles.viewDetails}>
                    View Details <IconChevronRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
