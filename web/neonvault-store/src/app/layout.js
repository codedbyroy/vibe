import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'NeonVault — Premium Anime Collectibles & LED Figurines',
  description: 'India\'s premium destination for anime collectibles, LED figurines, moon lamps, and limited-edition statues. One Piece, Dragon Ball, Seven Deadly Sins and more. Free shipping on orders above ₹999.',
  keywords: 'anime collectibles, LED figurines, anime lamps, one piece figurine, luffy gear 5, dragon ball, anime store india',
  openGraph: {
    title: 'NeonVault — Premium Anime Collectibles',
    description: 'India\'s premium destination for anime collectibles and LED figurines.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CartProvider>
          <Header />
          <main style={{ flex: 1, paddingTop: 'var(--header-height)' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
