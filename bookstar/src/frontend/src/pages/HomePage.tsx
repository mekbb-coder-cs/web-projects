export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to BookStar</h1>
        <p className="text-lg text-gray-600 mt-4">Discover and book study sessions from expert sharers.</p>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Discover Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Placeholder listing cards will be added here */}
            <div className="card">
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="card">
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="card">
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
