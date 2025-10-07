import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🏄 Surf Shop
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/collections/surfboards"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Surfboards
            </Link>
            <Link
              href="/collections/apparel"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Apparel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}