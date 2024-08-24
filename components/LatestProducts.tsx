import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import ProductCard from './ProductCard';

async function getLatestProducts(): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, orderBy('createdAt', 'desc'), limit(3));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export default async function LatestProducts() {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-text-primary">Latest Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {latestProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}