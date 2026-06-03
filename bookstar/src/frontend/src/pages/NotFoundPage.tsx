import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Page not found</p>
        <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-block mt-6">
          Go back home
        </Link>
      </div>
    </div>
  );
}
