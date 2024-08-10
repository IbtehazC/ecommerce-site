"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          const cart = JSON.parse(cartData);
          if (Array.isArray(cart)) {
            const count = cart.reduce(
              (sum, item) => sum + (item.quantity || 0),
              0
            );
            setCartItemsCount(count);
          } else {
            console.error("Cart data is not an array:", cart);
            setCartItemsCount(0);
          }
        } catch (error) {
          console.error("Error parsing cart data:", error);
          setCartItemsCount(0);
        }
      } else {
        setCartItemsCount(0);
      }
    };

    updateCartCount(); // Initial count

    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          Your Store
        </Link>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 focus:outline-none"
          aria-label="Shopping cart"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </nav>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
}
