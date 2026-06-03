import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

class TellbirrService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.tellbirr.apiUrl,
      headers: {
        'X-API-Key': config.tellbirr.apiKey,
        'X-App-ID': config.tellbirr.appId,
        'Content-Type': 'application/json',
      },
    });
  }

  async validateRequest(signature: string, payload: string): Promise<boolean> {
    try {
      // Implement signature validation logic based on Tellbirr requirements
      // This is a placeholder implementation
      console.log('[TELLBIRR] Validating request signature');
      return true;
    } catch (error) {
      console.error('[TELLBIRR] Signature validation failed:', error);
      return false;
    }
  }

  async getUserData(userId: string): Promise<any> {
    try {
      const response = await this.client.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('[TELLBIRR] Error fetching user data:', error);
      throw error;
    }
  }

  async updateUserData(userId: string, data: Record<string, any>): Promise<any> {
    try {
      const response = await this.client.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('[TELLBIRR] Error updating user data:', error);
      throw error;
    }
  }

  async sendNotification(userId: string, message: string): Promise<any> {
    try {
      const response = await this.client.post(`/notifications`, {
        userId,
        message,
        timestamp: new Date().getTime(),
      });
      return response.data;
    } catch (error) {
      console.error('[TELLBIRR] Error sending notification:', error);
      throw error;
    }
  }
}

export default new TellbirrService();
