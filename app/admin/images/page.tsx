"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import AdminNav from "@/components/AdminNav";

interface Image {
  id: string;
  url: string;
  name: string;
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const imagesCollection = collection(db, "images");
    const imagesSnapshot = await getDocs(imagesCollection);
    const imagesList = imagesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Image)
    );
    setImages(imagesList);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "images"), {
        url: downloadURL,
        name: file.name,
      });

      setMessage("Image uploaded successfully!");
      setFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: Image) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteDoc(doc(db, "images", image.id));
        const storageRef = ref(storage, `images/${image.name}`);
        await deleteObject(storageRef);
        setMessage("Image deleted successfully!");
        fetchImages();
      } catch (error) {
        console.error("Error deleting image:", error);
        setMessage("Failed to delete image. Please try again.");
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Images</h1>
        <form
          onSubmit={handleUpload}
          className="mb-8"
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="border p-4 rounded"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 object-cover mb-2"
              />
              <p>{image.name}</p>
              <button
                onClick={() => handleDelete(image)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
