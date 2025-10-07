// app/products/[slug]/page.tsx
import { getProduct, getReviewsForProduct } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReviewCard from '@/components/ReviewCard'
import { Collection } from '@/types'

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsForProduct(product.id)

  const collection = product.metadata.collection
  const isCollectionObject = collection && typeof collection === 'object' && 'title' in collection

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          Home
        </Link>
        {isCollectionObject && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={`/collections/${(collection as Collection).slug}`}
              className="text-primary-600 hover:text-primary-700"
            >
              {(collection as Collection).title}
            </Link>
          </>
        )}
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {product.metadata.product_images && product.metadata.product_images.length > 0 ? (
            <div className="space-y-4">
              <img
                src={`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.title}
                className="w-full rounded-lg shadow-lg"
                width={800}
                height={800}
              />
              {product.metadata.product_images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.metadata.product_images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${product.title} ${index + 2}`}
                      className="w-full rounded-lg shadow"
                      width={400}
                      height={400}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : product.thumbnail ? (
            <img
              src={`${product.thumbnail}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.title}
              className="w-full rounded-lg shadow-lg"
              width={800}
              height={800}
            />
          ) : null}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary-600">
              ${product.metadata.price}
            </span>
            {product.metadata.in_stock ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            {product.metadata.description}
          </p>

          {/* Sizes */}
          {product.metadata.sizes_available && product.metadata.sizes_available.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.metadata.sizes_available.map((size) => (
                  <span
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.metadata.colors_available && product.metadata.colors_available.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {product.metadata.colors_available.map((color) => (
                  <span
                    key={color}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={!product.metadata.in_stock}
            className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}