import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/admin"
            className="hover:text-gray-300"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className="hover:text-gray-300"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/admin/categories"
            className="hover:text-gray-300"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            href="/admin/hero"
            className="hover:text-gray-300"
          >
            Hero Section
          </Link>
        </li>
        <li>
          <Link
            href="/admin/images"
            className="hover:text-gray-300"
          >
            Images
          </Link>
        </li>
      </ul>
    </nav>
  );
}
