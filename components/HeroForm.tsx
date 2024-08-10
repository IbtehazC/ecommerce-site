"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface HeroFormProps {
  initialData?: HeroData;
  onSubmit: () => void;
}

export default function HeroForm({ initialData, onSubmit }: HeroFormProps) {
  const [heroData, setHeroData] = useState<HeroData>({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = heroData.imageUrl;

      if (file) {
        const storageRef = ref(storage, `hero/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "settings", "hero"), {
        ...heroData,
        imageUrl,
      });

      onSubmit();
    } catch (error) {
      console.error("Error updating hero section:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={heroData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label
          htmlFor="subtitle"
          className="block mb-1"
        >
          Subtitle
        </label>
        <textarea
          id="subtitle"
          name="subtitle"
          value={heroData.subtitle}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label
          htmlFor="image"
          className="block mb-1"
        >
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 max-w-xs"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Hero Section"}
      </button>
    </form>
  );
}
