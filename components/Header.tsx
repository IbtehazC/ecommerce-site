'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import CartModal from './CartModal';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-card-bg text-text-primary shadow-md relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Your Store
          </Link>
          <nav className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-text-primary hover:text-text-secondary transition duration-300">
              Home
            </Link>
            <Link href="/shop" className="text-text-primary hover:text-text-secondary transition duration-300">
              Shop
            </Link>
            <Link href="/about" className="text-text-primary hover:text-text-secondary transition duration-300">
              About
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-text-primary hover:text-text-secondary focus:outline-none transition duration-300"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-primary border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary"
                  />
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative text-text-primary hover:text-text-secondary focus:outline-none transition duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </nav>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary hover:text-text-secondary focus:outline-none transition duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card-bg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-text-secondary hover:bg-primary transition duration-300">
              Home
            </Link>
            <Link href="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-text-secondary hover:bg-primary transition duration-300">
              Shop
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-text-secondary hover:bg-primary transition duration-300">
              About
            </Link>
            <div className="relative px-3 py-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-text-primary hover:text-text-secondary focus:outline-none transition duration-300"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="mt-2 w-full px-4 py-2 bg-primary border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-primary"
                />
              )}
            </div>
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-text-secondary hover:bg-primary transition duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
            </button>
          </div>
        </div>
      )}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}