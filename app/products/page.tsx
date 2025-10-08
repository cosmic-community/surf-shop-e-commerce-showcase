import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'

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