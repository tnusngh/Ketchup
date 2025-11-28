# Single Server Setup - Ketchup HR System

## Overview
This document explains how all components run on a single Next.js server, configured for the Algorand environment.

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Next.js Server (Port 2000)      │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │   Frontend   │  │  API Routes  │   │
│  │   (React)    │  │  (/api/*)    │   │
│  └──────────────┘  └──────────────┘   │
│           │                │            │
│           └────────┬───────┘            │
│                    │                    │
│         ┌──────────▼──────────┐        │
│         │  Algorand Clients    │        │
│         │  (AlgoKit Utils)    │        │
│         └──────────┬──────────┘        │
│                    │                    │
└────────────────────┼────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                      │
    ┌────▼────┐          ┌──────▼─────┐
    │ Algorand│          │   Pera     │
    │ Network │          │  Wallet    │
    │(Testnet)│          │(Extension) │
    └─────────┘          └────────────┘
```

## 📦 What Runs on the Server

### 1. Frontend Application
- **Location**: `app/*` (Next.js App Router)
- **Routes**: 
  - `/` - Home page
  - `/employer` - Employer dashboard
  - `/hr` - HR dashboard
  - `/employee` - Employee dashboard
  - `/manager` - Manager dashboard
  - `/hr/onboarding` - Onboarding flow
  - `/employer/exit` - Exit workflow

### 2. Backend API Routes
- **Location**: `app/api/*`
- **Endpoints**:
  - `POST /api/payroll/initiate` - Create payroll transaction
  - `POST /api/payroll/send` - Send signed transaction
  - `GET /api/payroll/status` - Check transaction status

### 3. Algorand Integration
- **Location**: `lib/algorand/*`
- **Functions**:
  - `getAlgodClient()` - Get Algorand client
  - `getIndexerClient()` - Get Indexer client
  - Transaction creation utilities
  - Smart contract interaction

### 4. Wallet Integration
- **Location**: `components/wallet/*`, `hooks/usePeraWallet.ts`
- **Features**:
  - Pera Wallet connection
  - Transaction signing
  - Account management

## 🚀 Running the Server

### Development Mode

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your Algorand configuration

# Start development server
npm run dev
```

**Access**: http://localhost:2000

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm start
```

**Port**: Configured via `PORT` environment variable (default: 2000)

## 🔧 Configuration

### Environment Variables

All configuration is done via environment variables in `.env`:

```env
# Network
NEXT_PUBLIC_ALGORAND_NETWORK=testnet

# Smart Contract IDs
NEXT_PUBLIC_PAYROLL_APP_ID=0
NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=0
# ... etc

# Server
PORT=2000
```

### Algorand Network

The server automatically configures Algorand clients based on `NEXT_PUBLIC_ALGORAND_NETWORK`:

- **testnet**: Uses AlgoNode testnet endpoints
- **mainnet**: Uses AlgoNode mainnet endpoints
- **betanet**: Uses AlgoNode betanet endpoints

## 📡 API Endpoints

All API endpoints are served from the same server:

### Payroll API
```
POST /api/payroll/initiate
POST /api/payroll/send
GET  /api/payroll/status
```

### Future APIs (To be implemented)
```
POST /api/onboarding/create-did
POST /api/onboarding/anchor-credentials
GET  /api/employee/credentials
POST /api/leave/request
GET  /api/leave/balance
POST /api/recognition/issue
POST /api/grievance/file
POST /api/exit/initiate
```

## 🔐 Security Considerations

### Client-Side vs Server-Side

**Client-Side (Browser)**:
- Wallet connection
- Transaction signing
- UI rendering
- Public data fetching

**Server-Side (API Routes)**:
- Transaction creation
- Network communication
- Sensitive operations
- Data validation

### Best Practices

1. **Never expose private keys** in client-side code
2. **Use environment variables** for configuration
3. **Validate all inputs** in API routes
4. **Use HTTPS** in production
5. **Implement rate limiting** for API endpoints

## 🌐 Network Access

The server needs access to:

1. **Algorand Network**:
   - Algod API (for transactions)
   - Indexer API (for queries)
   - Via AlgoNode public endpoints

2. **Internet**:
   - npm registry (for dependencies)
   - AlgoKit updates
   - External services

3. **Browser**:
   - Pera Wallet extension
   - User interactions

## 📊 Monitoring

### Health Check

Create a health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'ok',
    network: process.env.NEXT_PUBLIC_ALGORAND_NETWORK,
    timestamp: new Date().toISOString()
  });
}
```

### Logging

- Server logs: Check terminal output
- Browser logs: Check browser console
- Network logs: Check Network tab in DevTools

## 🚢 Deployment

### Railway

The application is configured for Railway deployment:

1. **Connect Repository**: Link GitHub repo
2. **Set Environment Variables**: Add all `NEXT_PUBLIC_*` vars
3. **Deploy**: Automatic deployment on push

### Other Platforms

The application can be deployed to:
- **Vercel**: Native Next.js support
- **AWS**: Using AWS Amplify or EC2
- **DigitalOcean**: Using App Platform
- **Heroku**: Using Node.js buildpack

## ✅ Verification

### Check Server is Running

```bash
curl http://localhost:2000/api/health
```

### Check Algorand Connection

```bash
# In browser console or API route
const algod = getAlgodClient();
const status = await algod.status().do();
console.log(status);
```

### Check Wallet Integration

1. Open http://localhost:2000/employee
2. Click "Connect Wallet"
3. Verify connection works

## 🔄 Updates

### Adding New Features

1. **Frontend**: Add to `app/*` pages
2. **API**: Add to `app/api/*` routes
3. **Algorand**: Add to `lib/algorand/*`
4. **Types**: Add to `types/index.ts`

### Updating Configuration

1. Update `.env.example` with new variables
2. Update `ALGORAND_ENVIRONMENT_SETUP.md` with documentation
3. Update this file if architecture changes

## 📚 Related Documentation

- `ALGORAND_ENVIRONMENT_SETUP.md` - Algorand configuration
- `RAILWAY_SETUP.md` - Deployment guide
- `README.md` - Project overview
- `SETUP.md` - Setup instructions

## 🆘 Troubleshooting

### Server Won't Start
- Check Node.js version (18+)
- Verify all dependencies installed
- Check port 2000 is available
- Review error messages in terminal

### Algorand Connection Fails
- Verify network configuration
- Check AlgoNode endpoints are accessible
- Verify firewall settings
- Check environment variables

### API Routes Not Working
- Verify route files are in `app/api/*`
- Check HTTP method matches (GET/POST)
- Review server logs for errors
- Verify CORS if calling from external domain

### Wallet Not Connecting
- Verify Pera Wallet extension installed
- Check browser console for errors
- Ensure wallet is on correct network
- Try refreshing the page

