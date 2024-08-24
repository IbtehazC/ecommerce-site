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
  return productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
}