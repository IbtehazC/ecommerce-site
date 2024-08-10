"use client";

import { useState } from "react";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = () => {
    // Retrieve current cart data
    const cartData = localStorage.getItem("cart");
    let cart = [];

    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        if (Array.isArray(parsedCart)) {
          cart = parsedCart;
        } else {
          console.error("Cart data is not an array:", parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }

    // Find if the product is already in the cart
    const existingItemIndex = cart.findIndex(
      (item: any) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      // If the item exists, increment its quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If the item doesn't exist, add it with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger a custom event to update the cart count in the header
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    // Visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={addToCart}
      className={`px-6 py-3 rounded-full text-white font-semibold text-lg transition-colors ${
        isAdded
          ? "bg-green-500 hover:bg-green-600"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      disabled={isAdded}
    >
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
