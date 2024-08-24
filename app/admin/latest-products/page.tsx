import AdminNav from "@/components/AdminNav";
import LatestProducts from "@/components/LatestProducts";

export default function AdminLatestProductsPage() {
  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">
          Latest Products
        </h1>
        <LatestProducts />
      </div>
    </div>
  );
}
