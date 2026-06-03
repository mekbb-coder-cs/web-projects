export interface TellbirrRequest {
  userId: string;
  appId: string;
  timestamp: number;
  signature: string;
  data: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface AppContext {
  userId: string;
  appId: string;
  requestId: string;
}
