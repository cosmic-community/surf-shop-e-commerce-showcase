import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata.product_images?.[0]?.imgix_url || product.thumbnail

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        {imageUrl && (
          <div className="relative h-64 bg-gray-200">
            <img
              src={`${imageUrl}?w=600&h=512&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={600}
              height={512}
            />
            {!product.metadata.in_stock && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.metadata.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              ${product.metadata.price}
            </span>
            
            {product.metadata.in_stock && (
              <span className="text-green-600 text-sm font-semibold">
                In Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}