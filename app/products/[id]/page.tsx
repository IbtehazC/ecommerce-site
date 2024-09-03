import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    } as Product;
  } else {
    return null;
  }
}

export async function generateStaticParams() {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  
  return productsSnapshot.docs.map(doc => ({
    id: doc.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-primary text-text-primary">
      <Link href="/shop" className="inline-flex items-center text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Shop
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.images[0]} alt={product.name} className="w-full h-auto shadow-lg" />
        </div>
        <div className="bg-card-bg p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-text-secondary mb-6">BDT {product.price.toFixed(2)}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Description</h2>
            <p className="text-text-secondary">{product.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sizes</h2>
            <div className="flex space-x-2">
              {product.sizes.map(size => (
                <div key={size.label} className="border border-text-secondary px-3 py-1 rounded">
                  {size.label} ({size.measurement})
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Colors</h2>
            <div className="flex space-x-2">
              {product.colors.map(color => (
                <div 
                  key={color.name} 
                  className="w-8 h-8 rounded-full border border-text-secondary"
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}