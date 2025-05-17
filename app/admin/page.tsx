'use client'

import Link from 'next/link';
import AdminNav from '@/components/AdminNav';

export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    window.location.reload();
  };

  return (
    <div className="bg-primary min-h-screen">
      <AdminNav />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary text-center sm:text-left">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 text-sm sm:text-base self-center sm:self-auto"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Link 
            href="/admin/products" 
            className="p-4 sm:p-6 bg-card-bg shadow rounded hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
              Manage Products
            </h2>
            <p className="text-text-secondary mt-2 text-sm sm:text-base">
              Add, edit, and delete products
            </p>
          </Link>
          <Link 
            href="/admin/categories" 
            className="p-4 sm:p-6 bg-card-bg shadow rounded hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
              Manage Categories
            </h2>
            <p className="text-text-secondary mt-2 text-sm sm:text-base">
              Add, edit, and delete categories
            </p>
          </Link>
          <Link 
            href="/admin/hero" 
            className="p-4 sm:p-6 bg-card-bg shadow rounded hover:shadow-lg transition-shadow col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
              Update Hero Section
            </h2>
            <p className="text-text-secondary mt-2 text-sm sm:text-base">
              Update hero content and image
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}