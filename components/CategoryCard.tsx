import Link from 'next/link';
import { Category } from '@/types';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-card-bg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="p-3 sm:p-4 flex-grow">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover mb-3 sm:mb-4"
        />
        <div className="mt-auto">
          <Link 
            href={`/shop?category=${category.id}`}
            className="w-full border border-[#92c67b] text-[#92c67b] py-2 px-4 hover:bg-[#92c67b] hover:text-white transition duration-300 flex items-center justify-center text-sm sm:text-base"
          >
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            {category.name}
          </Link>
        </div>
      </div>
    </div>
  );
}