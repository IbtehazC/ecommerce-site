"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Product, Category } from "@/types";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: () => void;
}

export default function ProductForm({
  product,
  categories,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = product?.imageUrl || "";

      if (file) {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
      };

      if (product) {
        await updateDoc(doc(db, "products", product.id), productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

      onSubmit();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      product &&
      window.confirm("Are you sure you want to delete this product?")
    ) {
      try {
        await deleteDoc(doc(db, "products", product.id));
        onSubmit();
      } catch (error) {
        console.error("Error deleting product:", error);
        // Handle error (e.g., show error message)
      }
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setFile(null);
    setImagePreview("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block mb-1"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
          step="0.01"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block mb-1"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block mb-1"
        >
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 max-w-xs"
          />
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
}
