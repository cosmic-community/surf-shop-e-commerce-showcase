import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of premium surf gear and apparel. High-quality surfboards, wetsuits, board shorts, and accessories for surfers of all skill levels.',
  openGraph: {
    title: 'All Products - Surf Shop',
    description: 'Browse our complete collection of premium surf gear and apparel.',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/2a074950-a3a4-11f0-962f-a5a34af2c54a-photo-1559827260-dc66d52bef19-1759858591470.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Surf Shop Products'
      }
    ]
  }
}
export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600 text-lg">
          Browse our complete collection of premium surf gear and apparel
        </p>
      </div>
      
      <ProductGrid products={products} />
    </div>
  )
}