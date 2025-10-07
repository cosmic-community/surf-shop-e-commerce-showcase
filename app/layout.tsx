import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import CosmicBadge from '@/components/CosmicBadge'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Surf Shop - Premium Surf Gear & Apparel',
  description: 'High-quality surfboards, wetsuits, and surf gear for all skill levels. Shop our curated collections and read authentic customer reviews.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
        <body className={inter.className}>
          <AuthProvider>
            <CartProvider>
              <Navigation />
              <main className="min-h-screen">
                {children}
              </main>
            </CartProvider>
          </AuthProvider>
        <footer className="bg-secondary-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Surf Shop</h3>
                <p className="text-gray-300">
                  Premium surf gear and apparel for all skill levels. Quality you can trust, waves you'll love.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/" className="hover:text-primary-400">Home</a></li>
                    <li><a href="/collections/surfboards" className="hover:text-primary-400">Surfboards</a></li>
                    <li><a href="/collections/apparel" className="hover:text-primary-400">Apparel</a></li>
                    <li><a href="/contact" className="hover:text-primary-400">Contact</a></li>
                  </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                  <p className="text-gray-300">
                    Questions? We're here to help.<br />
                    Email: info@surfshop.com<br />
                    <a href="/contact" className="hover:text-primary-400">Contact Form</a>
                  </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Surf Shop. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}