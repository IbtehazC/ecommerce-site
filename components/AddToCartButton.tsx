"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import Button from "./Button";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { cartItems, updateCart } = useCart();

  const addToCart = () => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      const updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCart(updatedCart);
    } else {
      updateCart([...cartItems, { ...product, quantity: 1 }]);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={addToCart}
      disabled={isAdded}
      className={`w-full ${isAdded ? "opacity-75" : ""}`}
    >
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
}
