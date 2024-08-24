'use client'

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import AdminNav from '@/components/AdminNav';
import CategoryForm from '@/components/CategoryForm';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
    setCategories(categoriesList);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDelete = async (category: Category) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteDoc(doc(db, 'categories', category.id));

        if (category.imageUrl) {
          const imageRef = ref(storage, category.imageUrl);
          await deleteObject(imageRef);
        }

        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  const handleSubmit = () => {
    fetchCategories();
    setEditingCategory(null);
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Categories</h1>
        <CategoryForm 
          category={editingCategory || undefined} 
          onSubmit={handleSubmit}
          onDelete={() => {
            fetchCategories();
            setEditingCategory(null);
          }}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Existing Categories</h2>
          <ul className="space-y-4">
            {categories.map(category => (
              <li key={category.id} className="flex items-center justify-between border p-4 rounded">
                <div className="flex items-center">
                  <img src={category.imageUrl} alt={category.name} className="w-16 h-16 object-cover mr-4" />
                  <span>{category.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
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