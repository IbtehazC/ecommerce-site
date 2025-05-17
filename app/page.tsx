import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import CategorySlider from '@/components/CategorySlider';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import LatestProducts from '@/components/LatestProducts';
import FeatureCard from '@/components/FeatureCard';
import { Category } from '@/types';
import { TruckIcon, CurrencyDollarIcon, PhoneIcon, CreditCardIcon } from '@heroicons/react/24/outline';

async function getCategories(): Promise<Category[]> {
  const categoriesCollection = collection(db, 'categories');
  const categoriesSnapshot = await getDocs(categoriesCollection);
  return categoriesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Category));
}

export default async function Home() {
  const allCategories = await getCategories();

  return (
    <div className="bg-primary min-h-screen text-text-primary">
      <HeroSection />
      <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-0">
        {/* Categories section */}
        <div className="my-8 sm:my-12">
          <CategorySlider categories={allCategories} />
        </div>

        {/* Featured Products section */}
        <div className="mb-8 sm:mb-12">
          <FeaturedProducts />
        </div>

        {/* Latest Products section */}
        <div className="mb-8 sm:mb-12">
          <LatestProducts />
        </div>

        {/* Features section */}
        <div className="pb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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