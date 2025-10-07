import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItem } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as { items: CartItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            description: item.selectedSize && item.selectedColor
              ? `Size: ${item.selectedSize}, Color: ${item.selectedColor}`
              : item.selectedSize
              ? `Size: ${item.selectedSize}`
              : item.selectedColor
              ? `Color: ${item.selectedColor}`
              : undefined,
            images: item.product.metadata.product_images?.[0]?.imgix_url
              ? [`${item.product.metadata.product_images[0].imgix_url}?w=400&h=400&fit=crop&auto=format,compress`]
              : item.product.thumbnail
              ? [`${item.product.thumbnail}?w=400&h=400&fit=crop&auto=format,compress`]
              : undefined,
          },
          unit_amount: Math.round(item.product.metadata.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}