'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types'
import { ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!product.metadata.in_stock) return

    // Validate selections if options are available
    const hasSizes = product.metadata.sizes_available && product.metadata.sizes_available.length > 0
    const hasColors = product.metadata.colors_available && product.metadata.colors_available.length > 0

    if (hasSizes && !selectedSize) {
      alert('Please select a size')
      return
    }

    if (hasColors && !selectedColor) {
      alert('Please select a color')
      return
    }

    addItem(product, selectedSize || undefined, selectedColor || undefined)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Sizes */}
      {product.metadata.sizes_available && product.metadata.sizes_available.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.metadata.sizes_available.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedSize === size
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {product.metadata.colors_available && product.metadata.colors_available.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.metadata.colors_available.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedColor === color
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!product.metadata.in_stock || added}
        className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart!
          </>
        ) : product.metadata.in_stock ? (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </>
        ) : (
          'Out of Stock'
        )}
      </button>
    </div>
  )
}