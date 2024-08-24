import ShopClient from './ShopClient';
import { getCategories, getProducts } from '@/lib/shopData';

export default async function ShopPage() {
  const categories = await getCategories();
  const products = await getProducts();

  return <ShopClient initialCategories={categories} initialProducts={products} />;
}