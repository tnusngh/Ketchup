# Vercel Deployment Guide

## Quick Deploy

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select your project or create a new one
   - Choose your preferred settings

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub:**
   - Ensure your code is pushed to GitHub
   - Repository: `https://github.com/tnusngh/ketch-weave-core`

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `ketch-weave-core`

3. **Configure Build Settings:**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
   - Root Directory: `./` (default)

4. **Set Environment Variables:**
   Go to Project Settings → Environment Variables and add:
   ```
   NEXT_PUBLIC_ALGORAND_NETWORK=testnet
   NEXT_PUBLIC_PAYROLL_APP_ID=0
   NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=0
   NEXT_PUBLIC_IDENTITY_REGISTRY_APP_ID=0
   NEXT_PUBLIC_CANDIDATE_PIPELINE_APP_ID=0
   NEXT_PUBLIC_LEAVE_MANAGER_APP_ID=0
   NEXT_PUBLIC_RECOGNITION_APP_ID=0
   NEXT_PUBLIC_GRIEVANCE_DESK_APP_ID=0
   NEXT_PUBLIC_OFFBOARDING_APP_ID=0
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at: `https://your-project.vercel.app`

## Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL

## Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_ALGORAND_NETWORK` - Algorand network (testnet/mainnet)
- `NEXT_PUBLIC_PAYROLL_APP_ID` - Payroll smart contract app ID
- `NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID` - Employment registry app ID
- `NEXT_PUBLIC_IDENTITY_REGISTRY_APP_ID` - Identity registry app ID
- `NEXT_PUBLIC_CANDIDATE_PIPELINE_APP_ID` - Candidate pipeline app ID
- `NEXT_PUBLIC_LEAVE_MANAGER_APP_ID` - Leave manager app ID
- `NEXT_PUBLIC_RECOGNITION_APP_ID` - Recognition app ID
- `NEXT_PUBLIC_GRIEVANCE_DESK_APP_ID` - Grievance desk app ID
- `NEXT_PUBLIC_OFFBOARDING_APP_ID` - Offboarding app ID

## Benefits of Vercel

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Custom domains
- ✅ Analytics and monitoring
- ✅ Serverless functions support
- ✅ Edge network optimization

## Next Steps

1. Deploy to Vercel
2. Configure environment variables
3. Set up custom domain (optional)
4. Enable analytics (optional)
5. Configure automatic deployments

