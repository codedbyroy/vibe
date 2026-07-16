'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import styles from './page.module.css';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = activeCategory === 'all'
    ? products.filter(p => p.isActive)
    : products.filter(p => p.isActive && p.category === categories.find(c => c.slug === activeCategory)?.name);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.isFeatured - a.isFeatured;
  });

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>The Collection</h1>
            <p className={styles.pageDesc}>{products.length} premium collectibles in our vault</p>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters} id="product-filters">
          <div className={styles.categories}>
            <button
              className={`${styles.catBtn} ${activeCategory === 'all' ? styles.catActive : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All ({products.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                className={`${styles.catBtn} ${activeCategory === cat.slug ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          <select className={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)} id="sort-select">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className={styles.empty}>
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
