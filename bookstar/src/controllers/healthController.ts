import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ApiResponse = {
      success: true,
      message: 'Service is healthy',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      timestamp: Date.now(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: ApiResponse = {
      success: true,
      message: 'Application information',
      data: {
        name: 'Bookstar',
        version: '1.0.0',
        description: 'Bookstar app for Tellbirr superapp platform',
        environment: process.env.NODE_ENV || 'development',
      },
      timestamp: Date.now(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
