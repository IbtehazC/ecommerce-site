import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  } else {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-primary text-text-primary">
      <Button
        href="/shop"
        className="inline-flex items-center mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Shop
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto shadow-lg"
          />
        </div>
        <div className="bg-primary-light p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-text-primary mb-6">
            ${product.price.toFixed(2)}
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-text-primary">
              Product Description
            </h2>
            <p className="text-text-secondary">{product.description}</p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
