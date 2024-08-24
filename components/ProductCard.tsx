import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card-bg overflow-hidden shadow-lg">
      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-xl font-semibold text-text-primary hover:text-text-secondary transition duration-300">
            {product.name}
          </h2>
        </Link>
        <p className="text-text-secondary mt-2">${product.price.toFixed(2)}</p>
        <div className="mt-2">
          <p className="text-text-secondary text-sm">Sizes: {product.sizes.map(size => size.label).join(', ')}</p>
          <div className="flex mt-1">
            {product.colors.map(color => (
              <div 
                key={color.name}
                className="w-4 h-4 rounded-full mr-1"
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}