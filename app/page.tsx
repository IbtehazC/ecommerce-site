import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import HeroSection from "@/components/HeroSection";
import { Product, Category } from "@/types";
import FeatureCard from "@/components/FeatureCard";
import {
  TruckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

async function getCategories(): Promise<Category[]> {
  const categoriesCollection = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  return categoriesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Category)
  );
}

async function getProducts(): Promise<Product[]> {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  return productsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );
}

export default async function Home() {
  const allCategories = await getCategories();
  const products = await getProducts();

  // Take only the first 6 categories for the grid
  const displayedCategories = allCategories.slice(0, 6);

  return (
    <div className="bg-primary min-h-screen text-text-primary">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Categories</h2>
            <Link
              href="/categories"
              className="text-text-secondary hover:text-text-primary"
            >
              Show All Categories
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              Icon={TruckIcon}
              title="Free Shipping"
              description="Free shipping for orders over $150"
            />
            <FeatureCard
              Icon={CurrencyDollarIcon}
              title="Money Guarantee"
              description="30 days money back guarantee"
            />
            <FeatureCard
              Icon={PhoneIcon}
              title="Online Support"
              description="24 hours a day, 7 days a week"
            />
            <FeatureCard
              Icon={CreditCardIcon}
              title="Flexible Payment"
              description="Pay with multiple credit cards"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
