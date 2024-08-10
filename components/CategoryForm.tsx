"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category } from "@/types";

interface CategoryFormProps {
  category?: Category;
  onSubmit: () => void;
}

export default function CategoryForm({
  category,
  onSubmit,
}: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (category) {
        await updateDoc(doc(db, "categories", category.id), { name });
      } else {
        await addDoc(collection(db, "categories"), { name });
      }
      onSubmit();
      setName("");
    } catch (error) {
      console.error("Error saving category:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleDelete = async () => {
    if (
      category &&
      window.confirm("Are you sure you want to delete this category?")
    ) {
      try {
        await deleteDoc(doc(db, "categories", category.id));
        onSubmit();
      } catch (error) {
        console.error("Error deleting category:", error);
        // Handle error (e.g., show error message)
      }
    }
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
          Category Name
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
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {category ? "Update Category" : "Add Category"}
        </button>
        {category && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Category
          </button>
        )}
      </div>
    </form>
  );
}
