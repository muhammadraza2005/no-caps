"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const cartTotal = total();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Your cart is empty</h1>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added any caps yet.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Your Cart</h1>
            <p className="text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-500 transition flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-xl p-4 sm:p-6 flex gap-4 shadow-sm"
              >
                {/* Product image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {item.brand}
                      </p>
                      <h3 className="font-bold text-base sm:text-lg truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price + Quantity */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-200 transition rounded-l-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-bold text-sm min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-200 transition rounded-r-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item total */}
                    <div className="text-right">
                      <p className="font-black text-lg">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          PKR {item.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping link */}
            <Link
              href="/products"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 space-y-6">
              <h2 className="font-bold text-xl">Order Summary</h2>

              {/* Line items */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold">
                    PKR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-500">Calculated at checkout</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-black text-2xl">
                    PKR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Including all applicable taxes
                </p>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition"
              >
                Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Trust badges */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🔒</span> Secure checkout
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🚚</span> Free delivery across Pakistan
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>💯</span> 30-day returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}