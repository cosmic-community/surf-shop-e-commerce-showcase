'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Order } from '@/types'
import { Package, ChevronRight, Loader2 } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/account/orders')
      return
    }

    if (user) {
      fetchOrders()
    }
  }, [user, authLoading, router])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/account" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-4xl font-bold">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.metadata.order_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      order.metadata.order_status.key
                    )}`}
                  >
                    {order.metadata.order_status.value}
                  </span>
                </div>

                <div className="border-t pt-4 mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {order.metadata.order_items.length} item(s)
                  </p>
                  <div className="space-y-1">
                    {order.metadata.order_items.slice(0, 2).map((item, index) => (
                      <p key={index} className="text-gray-700">
                        {item.quantity}x {item.product_title}
                      </p>
                    ))}
                    {order.metadata.order_items.length > 2 && (
                      <p className="text-gray-500 text-sm">
                        +{order.metadata.order_items.length - 2} more item(s)
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-primary-600">
                      ${order.metadata.total_amount.toFixed(2)}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}