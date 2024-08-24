import Button from './Button';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-card-bg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="p-4 flex-grow">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="flex items-center px-4 pb-4 w-full text-center">
        <Button href={`/shop?category=${category.id}`} fullWidth>
          {category.name}
        </Button>
      </div>
    </div>
  );
}