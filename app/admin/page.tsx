import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="p-6 bg-primary-light shadow rounded"
        >
          Manage Products
        </Link>
        <Link
          href="/admin/categories"
          className="p-6 bg-primary-light shadow rounded"
        >
          Manage Categories
        </Link>
        <Link
          href="/admin/hero"
          className="p-6 bg-primary-light shadow rounded"
        >
          Update Hero Section
        </Link>
      </div>
    </div>
  );
}
