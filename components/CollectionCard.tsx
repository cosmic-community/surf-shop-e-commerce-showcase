import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const imageUrl = collection.metadata.hero_image?.imgix_url || collection.thumbnail

  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div className="relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
        {imageUrl && (
          <>
            <img
              src={`${imageUrl}?w=800&h=640&fit=crop&auto=format,compress`}
              alt={collection.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={800}
              height={640}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-3xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
            {collection.title}
          </h3>
          {collection.metadata.description && (
            <p className="text-gray-200 line-clamp-2">
              {collection.metadata.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}