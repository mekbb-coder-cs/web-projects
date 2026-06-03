# Bookstar - Tellbirr Superapp

A modern Node.js + Express backend application designed for seamless integration with the Tellbirr superapp platform.

## Overview

Bookstar is a production-ready backend service built with TypeScript and Express.js, specifically configured for deployment on the Tellbirr superapp platform. It provides a robust foundation for building scalable applications with built-in error handling, logging, Docker support, and Tellbirr API integration.

## Features

✨ **Modern Stack**
- Express.js with TypeScript
- ESLint & Prettier for code quality
- Jest for comprehensive testing
- Docker & Docker Compose ready

🔒 **Enterprise Ready**
- Error handling and logging middleware
- Environment-based configuration
- Graceful shutdown handling
- Health check endpoints

🚀 **Tellbirr Integration**
- Pre-configured Tellbirr service client
- API authentication setup
- User data management utilities
- Request validation framework

📦 **Developer Experience**
- Hot reload development server
- Type-safe code with TypeScript
- Pre-configured build setup
- Comprehensive project structure

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (optional, for containerized deployment)

## Installation

1. **Clone or navigate to project directory:**
   ```bash
   cd bookstar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure Tellbirr credentials:**
   Edit `.env` and add:
   - `TELLBIRR_API_KEY` - Your API key from Tellbirr
   - `TELLBIRR_APP_ID` - Your application ID
   - `TELLBIRR_APP_SECRET` - Your application secret
   - `TELLBIRR_API_URL` - Tellbirr API endpoint

## Quick Start

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000` with auto-reload enabled.

### Production Mode

```bash
npm run build
npm start
```

### Docker

```bash
# Build image
docker build -t bookstar .

# Run container
docker run -p 3000:3000 --env-file .env bookstar

# Or use Docker Compose
docker-compose up -d
```

## API Endpoints

### Health & Info

- `GET /api/v1/health/health` - Check server health
  ```bash
  curl http://localhost:3000/api/v1/health/health
  ```
  Response:
  ```json
  {
    "success": true,
    "message": "Service is healthy",
    "data": {
      "status": "ok",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "uptime": 123.45
    },
    "timestamp": 1704067200000
  }
  ```

- `GET /api/v1/health/info` - Get application info
  ```bash
  curl http://localhost:3000/api/v1/health/info
  ```

## Project Structure

```
bookstar/
├── src/
│   ├── config/              # Configuration management
│   │   └── index.ts
│   ├── controllers/         # Request handlers
│   │   └── healthController.ts
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   ├── routes/              # API routes
│   │   └── health.ts
│   ├── services/            # Business logic
│   │   └── tellbirrService.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   └── index.ts             # Entry point
├── .env.example             # Environment template
├── .github/
│   └── copilot-instructions.md
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── .dockerignore           # Docker ignore rules
├── Dockerfile              # Production Docker image
├── docker-compose.yml      # Docker Compose setup
├── jest.config.js          # Jest testing config
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## Development Commands

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start

# Run linter
npm run lint

# Run tests
npm test

# Type checking
npm run type-check
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Application environment |
| `PORT` | 3000 | Server port |
| `LOG_LEVEL` | debug | Logging level |
| `TELLBIRR_API_URL` | https://api.tellbirr.com | Tellbirr API endpoint |
| `TELLBIRR_API_KEY` | - | Tellbirr API key |
| `TELLBIRR_APP_ID` | - | Your app ID on Tellbirr |
| `TELLBIRR_APP_SECRET` | - | Your app secret |

## Tellbirr Integration

### Configuration

All Tellbirr configuration is centralized in `src/config/index.ts` and sourced from environment variables. Update your `.env` file with your Tellbirr credentials.

### Service Client

The `TellbirrService` in `src/services/tellbirrService.ts` provides:

- `validateRequest()` - Validate request signatures
- `getUserData()` - Fetch user data from Tellbirr
- `updateUserData()` - Update user data
- `sendNotification()` - Send notifications to users

### Example Usage

```typescript
import tellbirrService from './services/tellbirrService';

// Get user data
const userData = await tellbirrService.getUserData('user_123');

// Send notification
await tellbirrService.sendNotification('user_123', 'Your message here');
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Deployment

### Option 1: Docker (Recommended)

```bash
# Build image
docker build -t bookstar:1.0.0 .

# Run
docker run -p 3000:3000 --env-file .env bookstar:1.0.0
```

### Option 2: Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f bookstar

# Stop services
docker-compose down
```

### Option 3: Traditional Node.js

1. Install dependencies:
   ```bash
   npm install --production
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Start:
   ```bash
   npm start
   ```

### Health Checks

The application includes health check endpoints and Docker health checks. Monitor with:

```bash
curl http://localhost:3000/api/v1/health/health
```

## Code Quality

### Linting

ESLint is configured with TypeScript support:

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## Logging

The application includes comprehensive logging:

- **Request Logger** - Logs all incoming HTTP requests with status and duration
- **Error Logger** - Logs errors with stack traces and details
- **Tellbirr Logger** - Logs Tellbirr-specific operations

Access logs are printed to stdout in production environments.

## Error Handling

The application includes global error handling:

- Custom error types with status codes
- Consistent error response format
- Development vs production error details
- 404 route handling

## Extending the Application

### Adding New Routes

1. Create a controller in `src/controllers/`
2. Create a route file in `src/routes/`
3. Import and register in `src/index.ts`

Example:

```typescript
// src/controllers/exampleController.ts
export const example = (req: Request, res: Response) => {
  res.json({ message: 'Example' });
};

// src/routes/example.ts
import { Router } from 'express';
import { example } from '../controllers/exampleController';

const router = Router();
router.get('/', example);
export default router;

// In src/index.ts
import exampleRoutes from './routes/example';
app.use('/api/v1/example', exampleRoutes);
```

### Adding Services

Create new service files in `src/services/` for external API calls, database operations, or business logic.

## Troubleshooting

### Port Already in Use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Environment Variables Not Loading
- Ensure `.env` file exists in project root
- Check file naming (must be `.env`, not `.env.local`)
- Restart the development server after changes

### Docker Build Issues
- Ensure Docker daemon is running
- Check Node.js version compatibility
- Verify `.dockerignore` doesn't exclude essential files

## Performance

The application is optimized for:

- **Fast startup** - Lightweight Express setup
- **Memory efficient** - TypeScript compilation at build time
- **Production ready** - Graceful shutdown and error handling
- **Scalable** - Stateless design suitable for horizontal scaling

## Security

- Environment variables for sensitive data
- Non-root Docker user
- Input validation middleware ready
- TypeScript for type safety

## License

MIT

## Support

For issues or integration questions:

1. Check Tellbirr documentation: https://docs.tellbirr.com/
2. Review application logs
3. Check environment configuration
4. Contact Tellbirr support

## Changelog

### Version 1.0.0 (Initial Release)

- Initial project scaffold
- Express.js with TypeScript
- Docker support
- Tellbirr service integration
- Health check endpoints
- Comprehensive documentation

---

**Ready to deploy!** 🚀

For deployment instructions and best practices, refer to the [Tellbirr Deployment Guide](https://docs.tellbirr.com/deployment).
