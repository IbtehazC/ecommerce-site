import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully processed.
        </p>
        <Link href="/orders" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          View Order
        </Link>
        <Link href="/" className="inline-block ml-4 text-blue-500 hover:text-blue-600 transition duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}