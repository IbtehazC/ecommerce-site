import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function FailPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <XCircleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Failed</h2>
        <p className="text-gray-600 mb-8">
          We're sorry, but there was an issue processing your payment. Please try again or contact customer support.
        </p>
        <Link href="/checkout" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Try Again
        </Link>
        <Link href="/contact" className="inline-block ml-4 text-blue-500 hover:text-blue-600 transition duration-300">
          Contact Support
        </Link>
      </div>
    </div>
  );
}