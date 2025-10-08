import { getCollection, getProductsByCollection, getCollections } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import type { Metadata } from 'next'

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found'
    }
  }

  const imageUrl = collection.metadata.hero_image?.imgix_url
  const ogImage = imageUrl ? `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress` : undefined

  return {
    title: collection.title,
    description: collection.metadata.description || `Shop ${collection.title} collection at Surf Shop. Premium surf gear and apparel.`,
    openGraph: {
      title: `${collection.title} - Surf Shop`,
      description: collection.metadata.description || `Shop ${collection.title} collection.`,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: collection.title
        }
      ] : []
    }
  }
}

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id)

  return (
    <div>
      {/* Hero Section */}
      {collection.metadata.hero_image && (
        <div className="relative h-80 bg-gray-900">
          <img
            src={`${collection.metadata.hero_image.imgix_url}?w=2400&h=640&fit=crop&auto=format,compress`}
            alt={collection.title}
            className="w-full h-full object-cover opacity-70"
            width={2400}
            height={640}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{collection.title}</h1>
              {collection.metadata.description && (
                <p className="text-xl max-w-2xl mx-auto px-4">
                  {collection.metadata.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{collection.title}</span>
        </nav>

        {!collection.metadata.hero_image && (
          <>
            <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
            {collection.metadata.description && (
              <p className="text-xl text-gray-600 mb-8">
                {collection.metadata.description}
              </p>
            )}
          </>
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}