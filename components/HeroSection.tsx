import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Bungee_Inline } from "next/font/google";

const bungee = Bungee_Inline({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

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
    return null;
  }

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroData.imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-white text-center -mt-12 sm:-mt-16">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gray-300 font-bold mb-4 sm:mb-6">
            <h1 className={`${bungee.className} leading-tight px-4`}>
              {heroData.title}
            </h1>
          </div>
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="mt-4 px-6 sm:px-8 py-3 bg-white bg-opacity-40 text-white font-semibold rounded-full hover:bg-opacity-50 transition duration-300 text-sm sm:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}