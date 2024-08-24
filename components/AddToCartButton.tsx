'use client'

import { useState } from 'react';
import { Product, Size, Color } from '@/types';
import Button from './Button';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.label || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if the item already exists in the cart
    const existingItemIndex = existingCart.findIndex((item: any) => 
      item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
    );

    if (existingItemIndex > -1) {
      // If item exists, increase quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add new item
      existingCart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    // Dispatch a custom event to update cart count in header
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary mb-2">Size:</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full p-2 bg-primary text-text-primary border border-text-secondary rounded"
        >
          <option value="">Select Size</option>
          {product.sizes.map((size) => (
            <option key={size.label} value={size.label}>
              {size.label} ({size.measurement})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary mb-2">Color:</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full p-2 bg-primary text-text-primary border border-text-secondary rounded"
        >
          <option value="">Select Color</option>
          {product.colors.map((color) => (
            <option key={color.name} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={addToCart}
        disabled={isAdded}
        className={`w-full ${isAdded ? 'opacity-75' : ''}`}
      >
        {isAdded ? 'Added to Cart' : 'Add to Cart'}
      </Button>
    </div>
  );
}