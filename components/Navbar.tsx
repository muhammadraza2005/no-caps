"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, openCart } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">NC</span>
            </div>
            <span className="hidden sm:inline font-bold text-xl tracking-tighter">
              NO CAPS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium hover:text-gray-600 transition">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-gray-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-gray-600 transition">
              Contact
            </Link>
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart button - opens drawer */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-2">
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}