import { Review, Product } from '@/types'

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key)
  const product = review.metadata.product
  const isProductObject = product && typeof product === 'object' && 'title' in product

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-700 mb-4 italic">
        "{review.metadata.review_text}"
      </p>

      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-900">
          {review.metadata.customer_name}
        </span>
        {isProductObject && (
          <span className="text-gray-500">
            {(product as Product).title}
          </span>
        )}
      </div>
    </div>
  )
}