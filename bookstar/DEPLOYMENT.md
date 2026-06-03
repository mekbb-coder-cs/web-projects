# Deployment Guide - Bookstar on Tellbirr

This guide provides step-by-step instructions for deploying Bookstar to the Tellbirr superapp platform.

## Prerequisites

- Docker installed and configured
- Tellbirr developer account with app credentials
- Access to container registry (if using)
- Environment variables configured

## Deployment Steps

### 1. Prepare Your Application

Ensure all environment variables are set in `.env`:

```bash
cp .env.example .env
# Edit .env with your Tellbirr credentials
```

### 2. Build Docker Image

```bash
# Build the production image
docker build -t bookstar:1.0.0 .

# Verify the build
docker run -it bookstar:1.0.0 --help
```

### 3. Test Locally

```bash
# Start with docker-compose
docker-compose up

# Test the health endpoint
curl http://localhost:3000/api/v1/health/health

# View logs
docker-compose logs -f bookstar

# Stop services
docker-compose down
```

### 4. Push to Container Registry

If using a container registry (Docker Hub, ECR, etc.):

```bash
# Login to registry
docker login

# Tag image
docker tag bookstar:1.0.0 <registry>/bookstar:1.0.0

# Push image
docker push <registry>/bookstar:1.0.0
```

### 5. Deploy to Tellbirr

Follow Tellbirr's deployment documentation:

1. Navigate to your Tellbirr dashboard
2. Go to App Management → Your App
3. Deploy Configuration:
   - Set Docker image URL
   - Configure environment variables
   - Set resource limits
   - Configure health check path: `/api/v1/health/health`

4. Deploy:
   ```
   Click "Deploy" button
   ```

5. Monitor deployment:
   - Check deployment status
   - View application logs
   - Verify health checks passing

### 6. Configure Environment on Tellbirr

Set the following in Tellbirr's environment configuration:

```
NODE_ENV=production
PORT=3000
TELLBIRR_API_URL=<provided by Tellbirr>
TELLBIRR_API_KEY=<your API key>
TELLBIRR_APP_ID=<your app ID>
TELLBIRR_APP_SECRET=<your app secret>
LOG_LEVEL=info
```

### 7. Verify Deployment

```bash
# Test the deployed service
curl https://<your-tellbirr-app-url>/api/v1/health/health

# Check logs via Tellbirr dashboard
# Verify metrics and performance
```

## Rollback Procedure

If deployment fails:

1. Go to Tellbirr dashboard
2. Click "Rollback" on the deployment
3. Select previous working version
4. Click "Confirm Rollback"

## Production Checklist

Before deploying to production, verify:

- [ ] All environment variables configured
- [ ] Docker image builds successfully
- [ ] Health checks pass locally
- [ ] Tests pass: `npm test`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors in logs
- [ ] Graceful shutdown works
- [ ] Docker image is optimized (reasonable size)

## Performance Optimization

For production deployments:

### 1. Reduce Docker Image Size

```dockerfile
# Multi-stage build (already configured)
# Remove unused dependencies
npm ci --only=production
```

### 2. Enable Caching

```bash
docker build --cache-from <registry>/bookstar:latest -t bookstar:1.0.0 .
```

### 3. Configure Resource Limits

Tellbirr Configuration:
- **CPU**: 0.5-1 core
- **Memory**: 256MB-512MB
- **Replicas**: 2-3 for high availability

### 4. Set Up Auto-Scaling

Configure based on:
- CPU threshold: 70%
- Memory threshold: 80%
- Request count: > 100 req/s

## Monitoring & Logs

### Access Logs

1. Tellbirr Dashboard → Logs
2. Filter by level (ERROR, WARN, INFO)
3. Search by timestamp or request ID

### Metrics

Monitor via Tellbirr dashboard:
- Request latency
- Error rate
- Throughput
- Resource usage

### Set Up Alerts

Configure alerts for:
- High error rate (>5%)
- Response time > 5s
- Service down
- Memory usage > 90%

## Common Issues

### Issue: Port Already in Use

**Solution:**
```bash
# Check what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Issue: Environment Variables Not Loading

**Solution:**
1. Verify `.env` file exists
2. Check variable names match `src/config/index.ts`
3. Restart the application

### Issue: Health Check Failing

**Solution:**
1. Check if application is running: `docker logs <container>`
2. Verify port is exposed
3. Check network connectivity
4. Inspect health check endpoint

### Issue: Out of Memory

**Solution:**
1. Increase memory allocation in Tellbirr
2. Check for memory leaks in code
3. Monitor with: `docker stats`

## Updating Your Application

### Deploy New Version

1. Make code changes
2. Update version in `package.json`
3. Build new image: `docker build -t bookstar:1.1.0 .`
4. Push to registry: `docker push <registry>/bookstar:1.1.0`
5. Update deployment in Tellbirr to new tag
6. Click "Deploy"

### Zero-Downtime Updates

Tellbirr supports rolling updates:

1. Configure `replicas: 2` or more
2. Tellbirr will gradually update instances
3. No downtime during deployment
4. Automatic rollback on health check failure

## Backup & Recovery

### Backup Your Configuration

1. Export environment variables
2. Backup database (if applicable)
3. Store Docker image tags
4. Keep deployment logs

### Disaster Recovery

In case of failure:

1. **Immediate**: Trigger rollback in Tellbirr
2. **Short-term**: Deploy from backup image
3. **Long-term**: Review logs and fix root cause

## Security Best Practices

1. **Secrets Management**
   - Use Tellbirr's secret management (don't hardcode)
   - Rotate API keys regularly
   - Use environment-specific secrets

2. **Image Security**
   - Use official base images
   - Keep dependencies updated
   - Scan for vulnerabilities

3. **Network Security**
   - Use HTTPS for all traffic
   - Implement rate limiting
   - Validate all inputs

4. **Access Control**
   - Limit who can deploy
   - Use API key rotation
   - Enable audit logging

## Support & Documentation

- [Tellbirr Deployment Docs](https://docs.tellbirr.com/deployment)
- [Docker Documentation](https://docs.docker.com/)
- [Express.js Guide](https://expressjs.com/)

---

**Successfully deployed!** 🎉
