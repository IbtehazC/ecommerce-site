import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-text-primary hover:text-text-secondary transition duration-300">
            {product.name}
          </h2>
          <p className="text-text-secondary mt-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}