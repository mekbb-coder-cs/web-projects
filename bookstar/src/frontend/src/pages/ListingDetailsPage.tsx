import { useParams } from 'react-router-dom';

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Listing Details</h1>
          <p className="text-gray-600 mb-8">Loading listing {id}...</p>
          
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
          
          <button className="btn-primary mt-8">Book Now</button>
        </div>
      </div>
    </div>
  );
}
