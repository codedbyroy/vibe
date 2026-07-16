// Mock product data — will be replaced with Supabase queries later
export const products = [
  {
    id: '1',
    slug: 'gear-5-luffy-moon-lamp',
    name: 'Gear 5 Luffy Moon Lamp',
    shortDescription: 'One Piece Gear 5 Nika Sun God LED Moon Lamp — 28cm',
    description: `Unleash the power of the Sun God with this stunning Gear 5 Luffy Moon Lamp. Standing at an impressive 28cm, this LED lamp captures the iconic transformation of Monkey D. Luffy into his Gear 5 form from One Piece.\n\nThe lamp features adjustable brightness with 3 color modes (warm white, cool white, and warm yellow) controlled via touch. Made from high-quality PLA material with a detailed hand-painted finish that glows brilliantly in the dark.\n\nPerfect for any One Piece fan's desk, shelf, or nightstand. Makes an incredible gift for anime enthusiasts.`,
    price: 199900,
    compareAtPrice: 349900,
    images: ['/products/luffy-lamp-1.jpg', '/products/luffy-lamp-2.jpg', '/products/luffy-lamp-3.jpg'],
    category: 'LED Lamps',
    tags: ['one-piece', 'luffy', 'gear-5', 'lamp', 'led'],
    stockQuantity: 24,
    rating: 4.8,
    reviewCount: 47,
    weightGrams: 450,
    dimensions: { length: 15, width: 15, height: 28 },
    features: [
      '28cm tall — premium size',
      '3 LED color modes (touch control)',
      'USB-C powered — no batteries needed',
      'PLA material with hand-painted details',
      'Adjustable brightness',
      'Perfect desk/shelf display piece',
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'gear-5-luffy-led-figurine',
    name: 'Gear 5 Luffy LED Figurine',
    shortDescription: 'One Piece Gear 5 Action Figure with LED Base — 25cm',
    description: `Experience the raw power of Luffy's awakened Devil Fruit with this dynamic action figurine. The 25cm statue captures Luffy mid-transformation with flowing white hair, enlarged fists, and the characteristic laughing pose of Nika.\n\nThe LED-illuminated base cycles through red, blue, and purple modes, casting dramatic shadows that bring the figure to life. Premium PVC construction with meticulous paint application ensures museum-quality detail.\n\nA must-have centerpiece for any serious One Piece collection.`,
    price: 249900,
    compareAtPrice: 399900,
    images: ['/products/luffy-figure-1.jpg', '/products/luffy-figure-2.jpg', '/products/luffy-figure-3.jpg'],
    category: 'Figurines',
    tags: ['one-piece', 'luffy', 'gear-5', 'figurine', 'led'],
    stockQuantity: 18,
    rating: 4.9,
    reviewCount: 32,
    weightGrams: 680,
    dimensions: { length: 18, width: 14, height: 25 },
    features: [
      '25cm tall — dynamic action pose',
      'LED base with 3 color modes',
      'Premium PVC construction',
      'Museum-quality paint detail',
      'Removable base for display flexibility',
      'Collector-grade packaging',
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'escanor-seven-deadly-sins-statue',
    name: 'Escanor "The One" Statue',
    shortDescription: 'Seven Deadly Sins Escanor Ultimate Form — 30cm',
    description: `"Who decided that?" — Embody the pride of the Lion Sin with this breathtaking Escanor statue in his ultimate "The One" form. At 30cm, this piece captures the moment of Escanor at high noon, radiating pure solar energy.\n\nThe translucent flame effects around the figure glow with a warm amber light via built-in LEDs, creating a stunning display piece that commands attention from any angle.\n\nCrafted from premium resin with a weighted base for stability. Each piece is individually numbered, making it a true collector's item.`,
    price: 329900,
    compareAtPrice: 499900,
    images: ['/products/escanor-1.jpg', '/products/escanor-2.jpg', '/products/escanor-3.jpg'],
    category: 'Premium Statues',
    tags: ['seven-deadly-sins', 'escanor', 'statue', 'led', 'premium'],
    stockQuantity: 8,
    rating: 5.0,
    reviewCount: 12,
    weightGrams: 1200,
    dimensions: { length: 20, width: 20, height: 30 },
    features: [
      '30cm tall — commanding presence',
      'Built-in LED flame effects',
      'Premium resin construction',
      'Weighted base for stability',
      'Individually numbered collector piece',
      'Translucent flame elements',
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '4',
    slug: 'goku-ultra-instinct-led-lamp',
    name: 'Goku Ultra Instinct Lamp',
    shortDescription: 'Dragon Ball Super Ultra Instinct Goku LED Lamp — 26cm',
    description: `Transcend your limits with this Ultra Instinct Goku LED Lamp. The 26cm lamp depicts Goku in his mastered Ultra Instinct form with silver hair and serene expression, surrounded by a swirling aura of energy.\n\nThe lamp features a unique dual-layer design — the inner figure glows with white/silver light while the surrounding aura shell projects dynamic blue-purple patterns onto nearby surfaces.\n\nTouch-controlled with 4 brightness levels. USB-powered with an elegant circular base.`,
    price: 279900,
    compareAtPrice: 449900,
    images: ['/products/goku-lamp-1.jpg', '/products/goku-lamp-2.jpg', '/products/goku-lamp-3.jpg'],
    category: 'LED Lamps',
    tags: ['dragon-ball', 'goku', 'ultra-instinct', 'lamp', 'led'],
    stockQuantity: 15,
    rating: 4.7,
    reviewCount: 28,
    weightGrams: 520,
    dimensions: { length: 16, width: 16, height: 26 },
    features: [
      '26cm tall — dual-layer design',
      'Dynamic aura light projection',
      '4 brightness levels (touch control)',
      'USB-powered with elegant base',
      'Silver/white inner glow effect',
      'Premium display packaging',
    ],
    isActive: true,
    isFeatured: false,
  },
];

export const categories = [
  { name: 'LED Lamps', slug: 'led-lamps', count: 2 },
  { name: 'Figurines', slug: 'figurines', count: 1 },
  { name: 'Premium Statues', slug: 'premium-statues', count: 1 },
];

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null;
}

export function getFeaturedProducts() {
  return products.filter(p => p.isFeatured && p.isActive);
}

export function formatPrice(paisa) {
  return '₹' + (paisa / 100).toLocaleString('en-IN');
}

export function getDiscountPercent(price, compareAt) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
