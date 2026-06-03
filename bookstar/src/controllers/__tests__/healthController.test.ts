import { Request, Response } from 'express';
import { healthCheck, getInfo } from '../healthController';

describe('HealthController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext = jest.fn();

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('healthCheck', () => {
    it('should return 200 with healthy status', async () => {
      await healthCheck(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
      
      const call = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(call.success).toBe(true);
      expect(call.data.status).toBe('ok');
    });
  });

  describe('getInfo', () => {
    it('should return application info', async () => {
      await getInfo(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
      
      const call = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(call.success).toBe(true);
      expect(call.data.name).toBe('Bookstar');
      expect(call.data.version).toBe('1.0.0');
    });
  });
});
