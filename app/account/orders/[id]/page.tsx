// app/account/orders/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Order } from '@/types'
import { Package, Truck, CheckCircle, Loader2 } from 'lucide-react'

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    params.then((p) => setOrderId(p.id))
  }, [params])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/account/orders')
      return
    }

    if (user && orderId) {
      fetchOrder()
    }
  }, [user, authLoading, orderId, router])

  const fetchOrder = async () => {
    if (!orderId) return

    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      } else if (response.status === 404) {
        router.push('/account/orders')
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
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

  if (!user || !order) {
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shipped':
        return <Truck className="w-8 h-8" />
      case 'delivered':
        return <CheckCircle className="w-8 h-8" />
      default:
        return <Package className="w-8 h-8" />
    }
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
          <Link href="/account/orders" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Order Details</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                order.metadata.order_status.key
              )}`}
            >
              {order.metadata.order_status.value}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Information</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.metadata.order_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-primary-600">
                  ${order.metadata.total_amount.toFixed(2)}
                </p>
              </div>
              {order.metadata.tracking_number && (
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-semibold">{order.metadata.tracking_number}</p>
                </div>
              )}
            </div>
          </div>

          {order.metadata.shipping_address && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-1">
                <p>{order.metadata.shipping_address.street}</p>
                <p>
                  {order.metadata.shipping_address.city}, {order.metadata.shipping_address.state}{' '}
                  {order.metadata.shipping_address.zip}
                </p>
                <p>{order.metadata.shipping_address.country}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.metadata.order_items.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product_title}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                    {item.selected_size && ` • Size: ${item.selected_size}`}
                    {item.selected_color && ` • Color: ${item.selected_color}`}
                  </p>
                </div>
                <p className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              {getStatusIcon(order.metadata.order_status.key)}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Order Status: {order.metadata.order_status.value}</h3>
              <p className="text-gray-700">
                {order.metadata.order_status.key === 'pending' &&
                  'Your order is being processed. We will notify you once it ships.'}
                {order.metadata.order_status.key === 'processing' &&
                  'Your order is being prepared for shipment.'}
                {order.metadata.order_status.key === 'shipped' &&
                  'Your order has been shipped and is on its way!'}
                {order.metadata.order_status.key === 'delivered' &&
                  'Your order has been delivered. Thank you for shopping with us!'}
                {order.metadata.order_status.key === 'cancelled' &&
                  'This order has been cancelled.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}