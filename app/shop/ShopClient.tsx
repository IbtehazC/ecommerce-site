'use client'

import { useState, useEffect } from 'react';
import { Category, Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface ShopClientProps {
  initialCategories: Category[];
  initialProducts: Product[];
}

export default function ShopClient({ initialCategories, initialProducts }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(initialProducts.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(initialProducts);
    }
  }, [selectedCategory, initialProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Category filter */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <h2 className="text-xl font-bold mb-4 text-text-primary">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-2 py-1 rounded ${
                  selectedCategory === null ? 'bg-blue-500 text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                All Categories
              </button>
            </li>
            {initialCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-2 py-1 rounded ${
                    selectedCategory === category.id ? 'bg-blue-500 text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Product grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-text-secondary text-center mt-8">No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}