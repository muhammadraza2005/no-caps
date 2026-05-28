'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabase'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  description: string
  image_url: string
  sizes: string[]
  stock: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', parseInt(productId))
          .single()

        if (error) throw error
        setProduct(data)
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product || !selectedSize) return

    addItem({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.image_url,
      brand: product.brand,
      size: selectedSize,
      quantity: quantity,
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg aspect-square animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Brand */}
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                {product.brand}
              </p>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-5xl font-black text-black">
                PKR {product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">Free shipping across Pakistan</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-bold text-lg mb-4">Select Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border-2 rounded-lg font-semibold transition ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quantity</h3>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <span className="px-6 py-2 font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.stock > 0
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : product.stock > 0 ? (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              ) : (
                'Out of Stock'
              )}
            </button>

            {/* Stock Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">
                {product.stock > 0 ? (
                  <>
                    <span className="font-bold text-green-600">✓ In Stock</span>
                    <br />
                    {product.stock} units available
                  </>
                ) : (
                  <span className="font-bold text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <p className="text-gray-700">100% Authentic Product</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                <p className="text-gray-700">Fast Shipping (2-3 days)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💯</span>
                <p className="text-gray-700">30-Day Money Back Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section (Placeholder) */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-black mb-8">You Might Also Like</h2>
          <div className="text-gray-600">
            Related products coming soon...
          </div>
        </div>
      </div>
    </div>
  )
}