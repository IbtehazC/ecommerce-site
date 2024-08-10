import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center px-4">
          {heroData.title}
        </h1>
        <p className="text-xl md:text-2xl text-center px-4">
          {heroData.subtitle}
        </p>
      </div>
    </div>
  );
}
