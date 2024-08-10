"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminNav from "@/components/AdminNav";
import HeroForm from "@/components/HeroForm";

interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function AdminHeroPage() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const heroDoc = await getDoc(doc(db, "settings", "hero"));
      if (heroDoc.exists()) {
        setHeroData(heroDoc.data() as HeroData);
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setMessage("Failed to load hero data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setMessage("Hero section updated successfully!");
    fetchHeroData();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Update Hero Section</h1>
        <HeroForm
          initialData={heroData || undefined}
          onSubmit={handleSubmit}
        />
        {message && <p className="mt-4 text-green-600">{message}</p>}

        {heroData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Current Hero Section Preview
            </h2>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-semibold">{heroData.title}</h3>
              <p>{heroData.subtitle}</p>
              {heroData.imageUrl && (
                <img
                  src={heroData.imageUrl}
                  alt="Hero"
                  className="mt-4 max-w-full h-auto"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
