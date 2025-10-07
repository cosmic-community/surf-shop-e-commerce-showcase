import { Collection } from '@/types'
import CollectionCard from './CollectionCard'

interface CollectionGridProps {
  collections: Collection[];
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
  if (!collections || collections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No collections available.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}