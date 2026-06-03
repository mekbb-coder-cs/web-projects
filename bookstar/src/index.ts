import express from 'express';
import { config } from './config';
import { requestLogger, tellbirrRequestLogger } from './middleware/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import healthRoutes from './routes/health';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(tellbirrRequestLogger);

// Routes
app.use('/api/v1/health', healthRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Start server
const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Bookstar Server Started              ║
╠════════════════════════════════════════╣
║   Environment: ${config.env.padEnd(26, ' ')}║
║   Port: ${PORT.toString().padEnd(31, ' ')}║
║   URL: http://localhost:${PORT}${''.padEnd(21, ' ')}║
╚════════════════════════════════════════╝
  `);
  
  console.log('API Documentation:');
  console.log('  GET /api/v1/health/health - Health check');
  console.log('  GET /api/v1/health/info - Application info');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
