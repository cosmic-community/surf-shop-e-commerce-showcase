'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const { totalItems } = useCart()
  const { user } = useAuth()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🏄 Surf Shop
          </Link>
          
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/collections/surfboards"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Surfboards
              </Link>
              <Link
                href="/collections/apparel"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Apparel
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Contact
              </Link>
            
            {user ? (
              <Link
                href="/account"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Login
              </Link>
            )}
            
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}