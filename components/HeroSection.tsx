import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
}

async function getHeroData(): Promise<HeroData | null> {
  try {
    const heroDoc = await getDoc(doc(db, "settings", "hero"));
    if (heroDoc.exists()) {
      return heroDoc.data() as HeroData;
    }
  } catch (error) {
    console.error("Error fetching hero data:", error);
  }
  return null;
}

export default async function HeroSection() {
  const heroData = await getHeroData();

  if (!heroData) {
    return null; // or a default hero section
  }

  return (
    <div className="relative h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroData.imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">{heroData.title}</h1>
          <div className="flex justify-center">
          <Link 
              href="/shop" 
              className="mt-4 px-8 py-3 bg-white bg-opacity-40 text-black font-semibold rounded-lg hover:bg-opacity-50 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
