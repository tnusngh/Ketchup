# Railway Infrastructure Setup Guide

## Overview
This guide will help you deploy your Ketchup HR Frontend application to Railway.

## Prerequisites
- ✅ Railway CLI installed (`@railway/cli`)
- ✅ Railway account created at [railway.app](https://railway.app)
- ✅ Git repository (for deployment)

## Step 1: Login to Railway

```powershell
railway login
```

This will open your browser to authenticate with Railway.

## Step 2: Initialize Railway Project

```powershell
railway init
```

Follow the prompts:
- Choose to create a new project or link to existing
- Name your project (e.g., "ketchup-hr-frontend")
- Select the region closest to your users

## Step 3: Configure Environment Variables

Set up your environment variables in Railway:

### Required Environment Variables

```powershell
# Algorand Network Configuration
railway variables set NEXT_PUBLIC_ALGORAND_NETWORK=testnet

# Algorand Application IDs (if you have deployed smart contracts)
railway variables set NEXT_PUBLIC_PAYROLL_APP_ID=your_app_id
railway variables set NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=your_app_id

# Port (Railway will set this automatically, but you can override)
railway variables set PORT=2000
```

Or set them via Railway Dashboard:
1. Go to your project on Railway
2. Click on your service
3. Go to "Variables" tab
4. Add the required environment variables

### Optional Environment Variables

- `NODE_ENV=production` (usually set automatically)
- Any other environment variables your app needs

## Step 4: Deploy to Railway

### Option A: Deploy via CLI

```powershell
railway up
```

This will:
- Build your Next.js application
- Deploy it to Railway
- Provide you with a deployment URL

### Option B: Deploy via Git (Recommended)

1. **Connect your GitHub repository**:
   - Go to Railway Dashboard
   - Click on your project
   - Go to "Settings" → "Source"
   - Connect your GitHub repository
   - Select the branch to deploy (usually `main` or `master`)

2. **Automatic deployments**:
   - Railway will automatically deploy on every push to the connected branch
   - You can view deployments in the "Deployments" tab

## Step 5: Verify Deployment

1. **Check deployment status**:
   ```powershell
   railway status
   ```

2. **View logs**:
   ```powershell
   railway logs
   ```

3. **Open your deployed app**:
   ```powershell
   railway open
   ```

## Step 6: Configure Custom Domain (Optional)

1. Go to Railway Dashboard
2. Select your service
3. Go to "Settings" → "Domains"
4. Add your custom domain
5. Follow the DNS configuration instructions

## Railway Configuration Files

### `railway.json`
- Defines build and deployment settings
- Uses NIXPACKS builder (auto-detects Next.js)
- Configures restart policy

### `.railwayignore`
- Excludes unnecessary files from deployment
- Reduces deployment size and time

## Monitoring and Management

### View Logs
```powershell
railway logs
# Or follow logs in real-time
railway logs --follow
```

### Check Service Status
```powershell
railway status
```

### Open Railway Dashboard
```powershell
railway open
```

### Scale Your Service
- Go to Railway Dashboard
- Select your service
- Adjust resources (CPU, Memory) as needed

## Troubleshooting

### Build Fails
1. Check build logs: `railway logs`
2. Verify all dependencies are in `package.json`
3. Ensure Node.js version is compatible (Railway uses Node 20+ by default)

### Application Won't Start
1. Check that `PORT` environment variable is set (Railway sets this automatically)
2. Verify your start command in `package.json`
3. Check application logs for errors

### Environment Variables Not Working
1. Ensure variables are set in Railway Dashboard
2. Variables prefixed with `NEXT_PUBLIC_` are available in the browser
3. Restart the service after adding new variables

### Port Issues
- Railway automatically sets the `PORT` environment variable
- Your app should use `process.env.PORT` or `PORT` environment variable
- The start script in `package.json` uses `${PORT:-2000}` as fallback

## Next Steps

1. **Set up CI/CD**: Railway automatically deploys on git push
2. **Add database** (if needed): `railway add` to add PostgreSQL, MySQL, etc.
3. **Set up monitoring**: Use Railway's built-in metrics
4. **Configure custom domain**: Add your domain in Railway settings

## Useful Railway Commands

```powershell
# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open

# Check status
railway status

# Set environment variable
railway variables set KEY=value

# List environment variables
railway variables

# Link to existing project
railway link

# Unlink from project
railway unlink
```

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

