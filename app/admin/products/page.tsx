"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, Category } from "@/types";
import AdminNav from "@/components/AdminNav";
import ProductForm from "@/components/ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
    setProducts(productsList);
  };

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
    fetchProducts();
    fetchCategories();
  }, []);

  const handleProductSubmit = () => {
    fetchProducts();
    setSelectedProduct(null);
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
        <ProductForm
          product={selectedProduct || undefined}
          categories={categories}
          onSubmit={handleProductSubmit}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Existing Products</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="border p-4 rounded"
              >
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button
                  onClick={() => setSelectedProduct(product)}
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
