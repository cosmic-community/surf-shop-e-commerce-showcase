export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  )
}