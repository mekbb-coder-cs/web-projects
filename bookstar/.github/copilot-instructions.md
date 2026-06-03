# Bookstar Project Customization

This file provides customization instructions for the Bookstar project - a Node.js Express application designed for Tellbirr superapp platform.

## Project Overview

**Name:** Bookstar  
**Type:** Backend API Service  
**Framework:** Express.js + TypeScript  
**Platform:** Tellbirr Superapp  
**Node Version:** >=18.0.0  

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your Tellbirr credentials:**
   - `TELLBIRR_API_KEY`
   - `TELLBIRR_APP_ID`
   - `TELLBIRR_APP_SECRET`

4. **Development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── routes/          # API route definitions
├── services/        # Business logic and external API calls
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

## API Endpoints

### Health Check
- **GET** `/api/v1/health/health` - Server health status
- **GET** `/api/v1/health/info` - Application information

## Deployment Options

### Option 1: Docker (Recommended)
```bash
docker build -t bookstar .
docker run -p 3000:3000 --env-file .env bookstar
```

### Option 2: Docker Compose
```bash
docker-compose up -d
```

### Option 3: Direct Node.js
```bash
npm install --production
npm run build
npm start
```

## Environment Variables

Required environment variables are defined in `.env.example`. Key variables include:

- `NODE_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 3000)
- `TELLBIRR_API_URL` - Tellbirr API endpoint
- `TELLBIRR_API_KEY` - API authentication key
- `TELLBIRR_APP_ID` - Your application ID
- `TELLBIRR_APP_SECRET` - Your application secret

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run type-check` - Check TypeScript types

## Integration with Tellbirr Superapp

### Key Integration Points

1. **TellbirrService** (`src/services/tellbirrService.ts`)
   - Handles API communication with Tellbirr platform
   - Manages authentication and request signing
   - Provides methods for user data operations

2. **Middleware** (`src/middleware/`)
   - Request logging and error handling
   - Can be extended for Tellbirr-specific authentication

3. **Configuration** (`src/config/index.ts`)
   - Centralized Tellbirr credentials management
   - Environment-specific configuration

## Testing

Run tests with coverage:
```bash
npm test
```

## Linting

Check code quality:
```bash
npm run lint
```

## Production Deployment

1. Build Docker image:
   ```bash
   docker build -t bookstar:1.0.0 .
   ```

2. Push to registry (if using container registry):
   ```bash
   docker tag bookstar:1.0.0 <registry>/bookstar:1.0.0
   docker push <registry>/bookstar:1.0.0
   ```

3. Deploy using Docker or Kubernetes manifest

## Health Checks

The application includes a built-in health check endpoint and Docker health check configuration. Monitor using:

```bash
curl http://localhost:3000/api/v1/health/health
```

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tellbirr API Documentation](https://docs.tellbirr.com/)

## Support

For issues or questions, refer to Tellbirr documentation or contact the development team.
