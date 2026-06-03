// User types
export interface User {
  id: string;
  email: string;
  name: string;
  roles: ('sharer' | 'taker')[];
  rating_avg?: number;
  created_at: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  roles: ('sharer' | 'taker')[];
}

export interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
    user: User;
  };
  message: string;
}

// Listing types
export interface Listing {
  id: string;
  title: string;
  subject: string;
  exam_type: string;
  description: string;
  price: number;
  status: 'active' | 'inactive' | 'completed';
  sharer_id: string;
  sharer?: User;
  created_at: string;
  updated_at: string;
}

export interface CreateListingRequest {
  title: string;
  subject: string;
  exam_type: string;
  description: string;
  price: number;
}

// Transaction types
export interface Transaction {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  platform_cut: number;
  net_to_sharer: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

// Review types
export interface Review {
  id: string;
  transaction_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  message: string;
}
