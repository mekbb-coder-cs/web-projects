import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });
  
  next();
};

export const tellbirrRequestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Extract Tellbirr-specific request information if available
  const requestId = req.headers['x-request-id'] || 'unknown';
  const userId = (req as any).userId || 'anonymous';
  
  console.log(`[TELLBIRR] RequestID: ${requestId}, UserID: ${userId}, Path: ${req.path}`);
  
  next();
};
