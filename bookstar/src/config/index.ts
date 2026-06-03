import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Tellbirr Superapp Configuration
  tellbirr: {
    apiUrl: process.env.TELLBIRR_API_URL || 'https://api.tellbirr.com',
    apiKey: process.env.TELLBIRR_API_KEY || '',
    appId: process.env.TELLBIRR_APP_ID || '',
    appSecret: process.env.TELLBIRR_APP_SECRET || '',
  },
  
  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'bookstar',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  },
  
  // External Services
  externalApi: {
    url: process.env.EXTERNAL_API_URL || '',
    key: process.env.EXTERNAL_API_KEY || '',
  },
};

export default config;
