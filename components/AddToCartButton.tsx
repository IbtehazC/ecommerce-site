'use client'

import { useState } from 'react';
import { Product } from '@/types';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!isAdded) {  // Add this check to prevent double addition
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`w-full border border-[#92c67b] text-[#92c67b] py-2 px-4 hover:bg-[#92c67b] hover:text-white transition duration-300 flex items-center justify-center ${className} ${
        isAdded ? 'bg-[#92c67b] text-white' : ''
      }`}
    >
      <ShoppingCartIcon className="h-5 w-5 mr-2" />
      {isAdded ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
}