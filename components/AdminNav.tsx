import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav className="bg-primary-light text-text-primary p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/admin" className="hover:text-text-secondary">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/products" className="hover:text-text-secondary">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/categories" className="hover:text-text-secondary">
            Categories
          </Link>
        </li>
        <li>
          <Link href="/admin/hero" className="hover:text-text-secondary">
            Hero Section
          </Link>
        </li>
        <li>
          <Link href="/admin/latest-products" className="hover:text-text-secondary">
            Latest Products
          </Link>
        </li>
      </ul>
    </nav>
  );
}