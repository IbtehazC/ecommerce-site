"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const productsRef = collection(db, "products");
      let q = productsRef;
      if (categoryId) {
        q = query(productsRef, where("categoryId", "==", categoryId));
      }
      const querySnapshot = await getDocs(q);
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(fetchedProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  if (isLoading) {
    return <div className="text-text-primary">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Shop</h1>
      {products.length === 0 ? (
        <p className="text-text-primary">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
