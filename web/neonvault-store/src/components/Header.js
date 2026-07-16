'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconCart, IconMenu, IconX, IconUser, IconSearch, IconHeart } from '@/components/Icons';
import { useCart } from '@/lib/cart-context';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Collection' },
    { href: '/orders', label: 'Orders' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="main-header">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} id="logo-link">
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>NEON<span className={styles.logoAccent}>VAULT</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} id="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
                {pathname === link.href && <span className={styles.activeIndicator} />}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" id="search-btn">
              <IconSearch size={20} />
            </button>
            <Link href="/account" className={styles.actionBtn} aria-label="Account" id="account-btn">
              <IconUser size={20} />
            </Link>
            <Link href="/cart" className={styles.actionBtn} aria-label="Cart" id="cart-btn">
              <IconCart size={20} />
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </Link>
            <button
              className={`${styles.actionBtn} ${styles.menuBtn}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              id="menu-btn"
            >
              {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className={styles.searchBar}>
            <div className="container">
              <div className={styles.searchInner}>
                <IconSearch size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search collectibles..."
                  className={styles.searchInput}
                  autoFocus
                  id="search-input"
                />
                <button onClick={() => setSearchOpen(false)} className={styles.searchClose}>
                  <IconX size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <nav className={styles.mobileMenu} onClick={e => e.stopPropagation()} id="mobile-nav">
            <div className={styles.mobileMenuHeader}>
              <span className={styles.logoText}>NEON<span className={styles.logoAccent}>VAULT</span></span>
              <button onClick={() => setMobileOpen(false)} className={styles.mobileClose}>
                <IconX size={24} />
              </button>
            </div>
            <div className={styles.mobileLinks}>
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              <div className={styles.mobileDivider} />
              <Link href="/login" className={styles.mobileLink} style={{ animationDelay: '300ms' }}>
                Login / Sign Up
              </Link>
              <Link href="/account" className={styles.mobileLink} style={{ animationDelay: '360ms' }}>
                My Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
