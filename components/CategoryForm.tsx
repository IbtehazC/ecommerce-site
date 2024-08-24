import { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Category } from '@/types';
import Button from './Button';

interface CategoryFormProps {
  category?: Category;
  onSubmit: () => void;
  onDelete?: () => void;
}

export default function CategoryForm({ category, onSubmit, onDelete }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(category?.imageUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImagePreview(category.imageUrl);
    } else {
      setName('');
      setImage(null);
      setImagePreview('');
    }
  }, [category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = category?.imageUrl || '';

      if (image) {
        const storageRef = ref(storage, `categories/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const categoryData = {
        name,
        imageUrl,
      };

      if (category) {
        await updateDoc(doc(db, 'categories', category.id), categoryData);
      } else {
        await addDoc(collection(db, 'categories'), categoryData);
      }

      onSubmit();
      setName('');
      setImage(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!category || !window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    setIsLoading(true);

    try {
      await deleteDoc(doc(db, 'categories', category.id));

      if (category.imageUrl) {
        const imageRef = ref(storage, category.imageUrl);
        await deleteObject(imageRef);
      }

      onDelete?.();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Category Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs" />
        </div>
      )}
      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (category ? 'Update Category' : 'Add Category')}
        </Button>
        {category && (
          <Button type="button" onClick={handleDelete} disabled={isLoading} className="bg-red-500 hover:bg-red-600">
            {isLoading ? 'Deleting...' : 'Delete Category'}
          </Button>
        )}
      </div>
    </form>
  );
}