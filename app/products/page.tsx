'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const { addItem } = useCart()

  const brands = ['Nike', 'Adidas', 'New Era', 'Puma']

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const url =
          selectedBrand === 'all'
            ? '/api/products'
            : `/api/products?brand=${selectedBrand}`

        const response = await fetch(url)
        const data = await response.json()
        setProducts(data || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedBrand])

  // Filter by price range
  const filteredProducts = products.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  )

  const handleAddToCart = (product: Product) => {
    if (product.sizes && product.sizes.length > 0) {
      addItem({
        id: `${product.id}-${product.sizes[0]}`,
        name: product.name,
        price: product.price,
        image: product.image_url,
        brand: product.brand,
        size: product.sizes[0],
        quantity: 1,
      })
      alert(`Added ${product.name} to cart!`)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600">
            Browse our premium selection of authentic branded caps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 sticky top-20">
              {/* Brand Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Brands</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                      selectedBrand === 'all'
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                        selectedBrand === brand
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Min: PKR {priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: PKR {priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  Showing <span className="font-bold">{filteredProducts.length}</span> of{' '}
                  <span className="font-bold">{products.length}</span> products
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.stock < 5 && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Low Stock
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Brand */}
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        {product.brand}
                      </p>

                      {/* Name */}
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-black transition">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Sizes */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          Available Sizes
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((size) => (
                            <span
                              key={size}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-black text-black">
                            PKR {product.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Stock Info */}
                      <p className="text-xs text-gray-500 mt-3">
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="col-span-3 text-center py-16">
                <p className="text-xl text-gray-600">No products found</p>
                <button
                  onClick={() => {
                    setSelectedBrand('all')
                    setPriceRange([0, 5000])
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}