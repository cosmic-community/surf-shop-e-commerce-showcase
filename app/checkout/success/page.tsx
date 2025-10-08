'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

// Note: Metadata cannot be exported from client components
// SEO handled by parent layout

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(true)
  const [orderId, setOrderId] = useState<string | null>(null)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const processOrder = async () => {
      if (!sessionId) {
        setIsProcessing(false)
        return
      }

      try {
        // Create order record if user is logged in
        if (user) {
          const response = await fetch('/api/orders/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
          })

          if (response.ok) {
            const data = await response.json()
            setOrderId(data.order.id)
          }
        }

        // Clear cart
        clearCart()
      } catch (error) {
        console.error('Order processing error:', error)
      } finally {
        setIsProcessing(false)
      }
    }

    processOrder()
  }, [sessionId, user, clearCart])

  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Processing your order...</h2>
        <p className="text-gray-600">Please wait while we confirm your payment.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-6">Order Successful!</h1>
      <p className="text-xl text-gray-600 mb-8">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      {user && orderId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <p className="text-gray-700 mb-4">
            You can track your order in your account dashboard.
          </p>
          <Link
            href={`/account/orders/${orderId}`}
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            View Order Details
          </Link>
        </div>
      )}

      {!user && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <p className="text-gray-700 mb-4">
            Create an account to track your orders and access exclusive benefits.
          </p>
          <Link
            href="/login?redirect=/account/orders"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Create Account
          </Link>
        </div>
      )}

      <div className="space-x-4 mt-8">
        <Link
          href="/"
          className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </Link>
        {user && (
          <Link
            href="/account/orders"
            className="inline-block text-primary-600 hover:text-primary-700 font-semibold"
          >
            View All Orders
          </Link>
        )}
      </div>
    </div>
  )
}