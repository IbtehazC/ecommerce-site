import Link from "next/link";
import { Product } from "@/types";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card-bg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-72 object-cover mb-4"
          />

          <h2 className="text-lg font-semibold text-text-primary hover:text-text-secondary transition duration-300 mb-2">
            {product.name}
          </h2>

          <p className="text-text-secondary mb-2 ">
            BDT {product.price.toFixed(2)}
          </p>
          <div className="mt-auto">
            <p className="text-text-secondary text-sm mb-1">
              Sizes: {product.sizes.map((size) => size.label).join(", ")}
            </p>
          </div>
        </Link>
        <AddToCartButton
          product={product}
          className="w-full border mt-4 border-[#92c67b] text-[#92c67b] py-2 px-4 hover:bg-[#92c67b] hover:text-white transition duration-300"
        />
      </div>
    </div>
  );
}
