import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Product, Size, Color } from '@/types';
import Button from './Button';

interface ProductFormProps {
  product?: Product;
  categories: { id: string; name: string }[];
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export default function ProductForm({ product, categories, onSubmit, onDelete, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [category, setCategory] = useState(product?.category || '');
  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<Size[]>(product?.sizes || [
    { label: 'M', measurement: '' },
    { label: 'L', measurement: '' },
    { label: 'XL', measurement: '' },
    { label: 'XXL', measurement: '' },
  ]);
  const [colors, setColors] = useState<Color[]>(product?.colors || []);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>(product?.images || []);

  useEffect(() => {
    resetForm();
  }, [product]);

  const resetForm = () => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCategory(product.category);
      setSizes(product.sizes);
      setColors(product.colors);
      setIsFeatured(product.isFeatured);
      setImagePreview(product.images);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setSizes([
        { label: 'M', measurement: '' },
        { label: 'L', measurement: '' },
        { label: 'XL', measurement: '' },
        { label: 'XXL', measurement: '' },
      ]);
      setColors([]);
      setIsFeatured(false);
      setImagePreview([]);
    }
    setImages([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...newImages]);
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setImagePreview(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleSizeChange = (index: number, field: 'label' | 'measurement', value: string) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleColorChange = (index: number, field: 'name' | 'hexCode', value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const addSize = () => {
    setSizes([...sizes, { label: '', measurement: '' }]);
  };

  const addColor = () => {
    setColors([...colors, { name: '', hexCode: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrls = product?.images || [];

      if (images.length > 0) {
        const uploadedImages = await Promise.all(
          images.map(async (image) => {
            const storageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
          })
        );
        imageUrls = [...imageUrls, ...uploadedImages];
      }

      const productData = {
        name,
        description,
        price: parseFloat(price),
        images: imageUrls,
        category,
        sizes,
        colors,
        isFeatured,
        createdAt: product?.createdAt || new Date(),
      };

      if (product) {
        await updateDoc(doc(db, 'products', product.id), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }

      onSubmit();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
        <input
          type="file"
          id="images"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          multiple
          accept="image/*"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {imagePreview.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover" />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sizes</label>
        {sizes.map((size, index) => (
          <div key={index} className="flex space-x-2 mt-1">
            <input
              type="text"
              value={size.label}
              onChange={(e) => handleSizeChange(index, 'label', e.target.value)}
              placeholder="Size Label"
              className="block w-1/2 rounded-md border-gray-300 shadow-sm text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              value={size.measurement}
              onChange={(e) => handleSizeChange(index, 'measurement', e.target.value)}
              placeholder="Measurement"
              className="block w-1/2 rounded-md border-gray-300 shadow-sm text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        ))}
        <Button onClick={addSize} type="button" className="mt-2">Add Size</Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Colors</label>
        {colors.map((color, index) => (
          <div key={index} className="flex space-x-2 mt-1">
            <input
              type="text"
              value={color.name}
              onChange={(e) => handleColorChange(index, 'name', e.target.value)}
              placeholder="Color Name"
              className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="color"
              value={color.hexCode}
              onChange={(e) => handleColorChange(index, 'hexCode', e.target.value)}
              className="block w-1/2 h-10"
            />
          </div>
        ))}
        <Button onClick={addColor} type="button" className="mt-2">Add Color</Button>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Featured Product</span>
        </label>
      </div>

      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
        </Button>
        <Button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600">
          Cancel
        </Button>
        {product && onDelete && (
          <Button type="button" onClick={onDelete} disabled={isLoading} className="bg-red-500 hover:bg-red-600">
            Delete Product
          </Button>
        )}
      </div>
    </form>
  );
}