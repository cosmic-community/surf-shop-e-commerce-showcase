'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

export default function Navigation() {
  const { totalItems } = useCart()
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🏄 Surf Shop
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-4">
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
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
          >
            Home
          </Link>
          <Link
            href="/collections/surfboards"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
          >
            Surfboards
          </Link>
          <Link
            href="/collections/apparel"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
          >
            Apparel
          </Link>
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
          >
            Contact
          </Link>
          
          <div className="border-t border-gray-200 pt-4">
            {user ? (
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 block"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 block"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}