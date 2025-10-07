import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { createOrder } from '@/lib/cosmic'
import { Order } from '@/types'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Parse order items from metadata
    const items = JSON.parse(session.metadata?.items || '[]') as Order['metadata']['order_items']

    // Create order in Cosmic
    const order = await createOrder({
      userId: currentUser.userId,
      items,
      totalAmount: (session.amount_total || 0) / 100,
      stripeSessionId: sessionId,
      shippingAddress: session.customer_details?.address ? {
        street: session.customer_details.address.line1 || '',
        city: session.customer_details.address.city || '',
        state: session.customer_details.address.state || '',
        zip: session.customer_details.address.postal_code || '',
        country: session.customer_details.address.country || ''
      } : undefined
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}