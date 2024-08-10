"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category } from "@/types";
import AdminNav from "@/components/AdminNav";
import CategoryForm from "@/components/CategoryForm";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Category)
    );
    setCategories(categoriesList);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = () => {
    fetchCategories();
    setSelectedCategory(null);
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Categories</h1>
        <CategoryForm
          category={selectedCategory || undefined}
          onSubmit={handleCategorySubmit}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Existing Categories</h2>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className="border p-4 rounded"
              >
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
