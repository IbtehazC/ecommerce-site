import Button from "./Button";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-primary-light overflow-hidden shadow-lg flex flex-col h-full">
      <div className="p-4 flex-grow">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 mt-auto w-full">
        <Button
          href={`/shop?category=${category.id}`}
          className="w-full block text-center"
        >
          {category.name}
        </Button>
      </div>
    </div>
  );
}
