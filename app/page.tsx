import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Ketchup HR System
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Decentralized HR Management Platform
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/employer"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Employer Dashboard
          </Link>
          <Link
            href="/hr"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            HR Dashboard
          </Link>
          <Link
            href="/employee"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Employee Dashboard
          </Link>
          <Link
            href="/manager"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Manager Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}


