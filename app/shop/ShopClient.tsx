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
  const [sortOption, setSortOption] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let result = initialProducts;

    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercasedTerm) ||
        product.description.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Sort products
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      // 'default' sorting (or any unrecognized option) will use the original order
    }

    setFilteredProducts(result);
  }, [selectedCategory, initialProducts, sortOption, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar with category filter */}
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

        {/* Right side with products */}
        <div className="w-full md:w-3/4">
          {/* Search and sort controls */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 sm:mb-0 w-full sm:w-64 px-4 py-2 rounded-md bg-card-bg text-text-primary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-card-bg text-text-primary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default sorting</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest first</option>
            </select>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-text-secondary text-center mt-8">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}