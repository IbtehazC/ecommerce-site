'use client'

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import AdminNav from '@/components/AdminNav';
import ProductForm from '@/components/ProductForm';
import { Product, Category } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    setProducts(productsList);
  };

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
    setCategories(categoriesList);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', product.id));

        // Delete associated images from Storage
        for (const imageUrl of product.images) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }

        fetchProducts();
        setEditingProduct(null);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleSubmit = () => {
    fetchProducts();
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="bg-primary min-h-screen">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Manage Products</h1>
        <div className="bg-card-bg p-6 rounded-lg shadow-lg mb-8">
          <ProductForm 
            product={editingProduct || undefined} 
            categories={categories} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onDelete={editingProduct ? () => handleDelete(editingProduct) : undefined}
          />
        </div>
        <div className="bg-card-bg p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Existing Products</h2>
          <ul className="space-y-4">
            {products.map(product => (
              <li key={product.id} className="flex items-center justify-between border p-4 rounded">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  {product.isFeatured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Featured</span>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}