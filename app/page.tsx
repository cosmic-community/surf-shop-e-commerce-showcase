import { getProducts, getCollections, getAllReviews } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import CollectionGrid from '@/components/CollectionGrid'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

export default async function HomePage() {
  const [products, collections, reviews] = await Promise.all([
    getProducts(),
    getCollections(),
    getAllReviews(),
  ])

  const featuredProducts = products.slice(0, 6)
  const featuredReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ride the Wave
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Premium surf gear and apparel for surfers of all levels. Quality you can trust, waves you'll love.
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Collection</h2>
          <CollectionGrid collections={collections} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              href="#products"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All →
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Customer Reviews Section */}
      {featuredReviews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">All Products</h2>
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  )
}