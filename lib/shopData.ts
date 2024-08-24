import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Category, Product } from '@/types';

export async function getCategories(): Promise<Category[]> {
  const categoriesCollection = collection(db, 'categories');
  const categoriesSnapshot = await getDocs(categoriesCollection);
  return categoriesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Category));
}

export async function getProducts(): Promise<Product[]> {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  return productsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      images: data.images,
      category: data.category,
      sizes: data.sizes,
      colors: data.colors,
      isFeatured: data.isFeatured,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    } as Product;
  });
}