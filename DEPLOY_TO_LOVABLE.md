# Deploy to Lovable - ketch-weave-core.lovable.app

## Overview
This guide helps you deploy the Ketchup HR system (Next.js) to Lovable, which currently hosts the Vite version from ketch-weave-core repository.

## 🎯 Deployment Options

### Option 1: Replace Vite App with Next.js (Recommended)
Replace the entire ketch-weave-core repository with the Next.js version.

### Option 2: Push to New Branch
Create a new branch (e.g., `nextjs-version`) in ketch-weave-core with Next.js code.

### Option 3: Convert Components Only
Extract and convert only the UI components from Vite to Next.js format.

---

## Option 1: Replace Entire Repository (Recommended)

Since Lovable auto-deploys from GitHub, we'll push the Next.js version to ketch-weave-core.

### Step 1: Add ketch-weave-core as Remote

```bash
# In Ketchup-1 directory
git remote add lovable https://github.com/tnusngh/ketch-weave-core.git
```

### Step 2: Push to New Branch (Safer)

```bash
# Create and push to nextjs branch
git checkout -b nextjs-version
git push lovable nextjs-version
```

### Step 3: Or Replace Main Branch (Direct)

⚠️ **Warning**: This will replace the Vite app completely.

```bash
# Push to main branch (replaces Vite app)
git push lovable main:main --force
```

---

## Option 2: Manual Deployment via Lovable Dashboard

1. Go to Lovable dashboard
2. Connect ketch-weave-core repository
3. Update build settings to use Next.js
4. Deploy

---

## Option 3: Hybrid Approach (Best)

Keep both versions and deploy Next.js:

1. **Push Next.js to new branch**: `nextjs-main`
2. **Update Lovable settings** to use `nextjs-main` branch
3. **Keep Vite version** on `main` branch as backup

---

## 🚀 Quick Deployment Steps

### Step 1: Prepare Current Code

```bash
# In Ketchup-1 directory
# Commit all changes first
git add .
git commit -m "Prepare for Lovable deployment"
```

### Step 2: Add Lovable Remote

```bash
git remote add lovable https://github.com/tnusngh/ketch-weave-core.git
```

### Step 3: Push to Branch

```bash
# Push to nextjs branch (safer)
git push lovable main:nextjs-main

# Or if you want to replace main
git push lovable main:main --force
```

### Step 4: Update Lovable Settings

1. Go to Lovable dashboard
2. Select ketch-weave-core project
3. Update branch to `nextjs-main` (if using new branch)
4. Update build command to: `npm run build`
5. Update start command to: `npm start`
6. Redeploy

---

## ⚙️ Lovable Configuration

### Build Settings

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+

### Environment Variables

Set in Lovable dashboard:
- `NEXT_PUBLIC_ALGORAND_NETWORK=testnet`
- `NEXT_PUBLIC_PAYROLL_APP_ID=0`
- `NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=0`
- (Add all other env vars from `.env.example`)

### Port Configuration

Lovable will automatically set `PORT` environment variable.

---

## 📋 Pre-Deployment Checklist

- [ ] All changes committed in Ketchup-1
- [ ] `.env.example` created with all variables
- [ ] `package.json` has correct build/start scripts
- [ ] `next.config.js` configured for production
- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Test production build (`npm start`)

---

## 🔧 Troubleshooting

### Build Fails on Lovable
- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs in Lovable dashboard

### App Doesn't Start
- Verify `PORT` is used correctly (Lovable sets this)
- Check start command in Lovable settings
- Review server logs

### Environment Variables Not Working
- Ensure variables are set in Lovable dashboard
- Variables must start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding variables

---

## 🎯 Recommended Approach

**I recommend Option 3 (Hybrid)**:

1. Push Next.js to `nextjs-main` branch
2. Update Lovable to use `nextjs-main`
3. Keep Vite version on `main` as backup
4. Test thoroughly before switching

This way:
- ✅ You keep the Vite version as backup
- ✅ Can easily switch back if needed
- ✅ Next.js version gets deployed
- ✅ No risk of losing the original code

---

## 📝 Next Steps After Deployment

1. **Test the deployment**: Visit https://ketch-weave-core.lovable.app
2. **Verify all dashboards work**: /employer, /hr, /employee, /manager
3. **Test Algorand integration**: Wallet connection, transactions
4. **Check environment variables**: Ensure all are set correctly
5. **Monitor logs**: Check for any errors

---

## 🔗 Resources

- [Lovable Documentation](https://docs.lovable.dev)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Git Remote Management](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

