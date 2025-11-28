# Algorand Environment Configuration Guide

## Overview
This guide ensures all components are properly configured for the Algorand blockchain environment and run on a single server.

## ✅ Current Setup Status

### 1. AlgoKit 3 Integration
- ✅ AlgoKit CLI installed
- ✅ `@algorandfoundation/algokit-utils` npm package installed
- ✅ Algorand client configuration using AlgoKit utilities

### 2. Algorand Network Configuration

The system supports three networks:
- **Testnet**: For development and testing
- **Mainnet**: For production
- **Betanet**: For beta testing

**Configuration Location**: `lib/algorand/config.ts`

**Network Selection**: Set via `NEXT_PUBLIC_ALGORAND_NETWORK` environment variable

### 3. Smart Contract Application IDs

The system requires the following smart contract application IDs:

| Contract | Environment Variable | Purpose |
|----------|---------------------|---------|
| Payroll App | `NEXT_PUBLIC_PAYROLL_APP_ID` | Payroll transactions |
| Employment Registry | `NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID` | Employee records |
| Identity Registry | `NEXT_PUBLIC_IDENTITY_REGISTRY_APP_ID` | DID management |
| Candidate Pipeline | `NEXT_PUBLIC_CANDIDATE_PIPELINE_APP_ID` | Onboarding |
| Leave Manager | `NEXT_PUBLIC_LEAVE_MANAGER_APP_ID` | Leave management |
| Recognition App | `NEXT_PUBLIC_RECOGNITION_APP_ID` | Awards & credentials |
| Grievance Desk | `NEXT_PUBLIC_GRIEVANCE_DESK_APP_ID` | Grievance handling |
| Offboarding App | `NEXT_PUBLIC_OFFBOARDING_APP_ID` | Exit process |

## 🚀 Single Server Setup

### All Services Run on One Server

The application is configured to run everything on a single Next.js server:

1. **Frontend**: Next.js React application
2. **Backend API**: Next.js API routes (`/app/api/*`)
3. **Algorand Integration**: Client-side and server-side
4. **Wallet Integration**: Pera Wallet (browser extension)

### Server Configuration

**Development**:
```bash
npm run dev
# Runs on http://localhost:2000
```

**Production**:
```bash
npm run build
npm start
# Runs on configured PORT (default: 2000)
```

## 📋 Environment Variables Setup

### Step 1: Create `.env` file

```bash
cp .env.example .env
```

### Step 2: Configure Algorand Network

```env
NEXT_PUBLIC_ALGORAND_NETWORK=testnet
```

### Step 3: Add Smart Contract IDs

After deploying your smart contracts, update the `.env` file:

```env
NEXT_PUBLIC_PAYROLL_APP_ID=12345678
NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=12345679
# ... etc
```

## 🔧 Algorand Client Configuration

### Current Implementation

The system uses **AlgoKit 3** utilities for Algorand client management:

**File**: `lib/algorand/config.ts`

**Features**:
- Automatic network detection
- AlgoNode endpoint configuration
- Fallback to direct algosdk clients
- Indexer client support

### Network Endpoints

**Testnet**:
- Algod: `https://testnet-api.algonode.cloud`
- Indexer: `https://testnet-idx.algonode.cloud`

**Mainnet**:
- Algod: `https://mainnet-api.algonode.cloud`
- Indexer: `https://mainnet-idx.algonode.cloud`

## 🔐 Wallet Integration

### Pera Wallet Setup

1. **Install Extension**:
   - Chrome: https://chrome.google.com/webstore/detail/pera-algo-wallet/lghipjgeodkhihjmbnfljamblajbgmig
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/pera-algo-wallet/

2. **Create/Import Account**:
   - Create new account or import existing
   - Switch to Testnet for development

3. **Fund Account** (Testnet):
   - Visit: https://bank.testnet.algonode.cloud/
   - Request testnet ALGO

### Wallet Integration Points

- **Employee Dashboard**: Credential sync, export proofs
- **Payroll**: Transaction signing
- **Onboarding**: DID creation and credential anchoring
- **Exit**: Credential issuance to wallet

## 📡 API Endpoints (Single Server)

All API endpoints run on the same Next.js server:

### Payroll Endpoints
- `POST /api/payroll/initiate` - Create unsigned transaction
- `POST /api/payroll/send` - Send signed transaction
- `GET /api/payroll/status` - Check transaction status

### Future Endpoints (To be implemented)
- `POST /api/onboarding/create-did` - Create DID for candidate
- `POST /api/onboarding/anchor-credentials` - Anchor credentials
- `GET /api/employee/credentials` - Get employee credentials
- `POST /api/leave/request` - Create leave request
- `GET /api/leave/balance` - Get leave balance
- `POST /api/recognition/issue` - Issue recognition credential
- `POST /api/grievance/file` - File grievance
- `POST /api/exit/initiate` - Initiate exit process

## 🎯 Smart Contract Integration

### Contract Interaction Flow

1. **Frontend** → User action (e.g., request leave)
2. **API Route** → Create transaction using algosdk
3. **Wallet** → User signs transaction
4. **API Route** → Submit to Algorand network
5. **Indexer** → Query transaction status
6. **Frontend** → Update UI with result

### Transaction Types

- **Application Call**: Interact with smart contracts
- **Payment**: Transfer ALGO (e.g., payroll)
- **Asset Transfer**: Transfer ASAs (e.g., recognition NFTs)
- **Box Storage**: Store data in contract boxes

## 🔄 Event-Driven Architecture

### ARC-28 Events

Smart contracts emit ARC-28 events that can be consumed by:
- **AlgoKit Subscriber**: Off-chain event listener
- **Indexer**: Query events via API
- **Frontend**: Poll for events or use WebSocket

### Event Types

- `EmployeeActivated` - New employee onboarded
- `LeaveRequested` - Leave request created
- `RecognitionIssued` - Award/credential issued
- `GrievanceFiled` - Grievance submitted
- `ExitInitiated` - Exit process started
- `CredentialIssued` - Credential minted to wallet

## 🚢 Deployment Configuration

### Railway Deployment

The application is configured for Railway deployment:

**Files**:
- `railway.json` - Railway configuration
- `.railwayignore` - Files to exclude
- `.nixpacks.toml` - Build configuration

**Environment Variables in Railway**:
Set all `NEXT_PUBLIC_*` variables in Railway dashboard

### Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run development server
npm run dev
```

## ✅ Verification Checklist

- [ ] AlgoKit CLI installed and working
- [ ] `.env` file created with network configuration
- [ ] Smart contract IDs configured (if deployed)
- [ ] Pera Wallet extension installed
- [ ] Testnet account created and funded
- [ ] Development server running on port 2000
- [ ] All dashboards accessible
- [ ] Wallet connection working
- [ ] API endpoints responding

## 🔍 Testing Algorand Integration

### Test Network Connection

```typescript
import { getAlgodClient } from '@/lib/algorand/config';

const algod = getAlgodClient();
const status = await algod.status().do();
console.log('Network:', status);
```

### Test Wallet Connection

1. Open Employee Dashboard
2. Click "Connect Wallet"
3. Approve connection in Pera Wallet
4. Verify address is displayed

### Test Transaction

1. Go to Payroll section
2. Create a test transaction
3. Sign with Pera Wallet
4. Verify transaction on AlgoExplorer

## 📚 Resources

- [AlgoKit Documentation](https://dev.algorand.co/getting-started/algokit-quick-start/)
- [Algorand Developer Portal](https://developer.algorand.org/)
- [Pera Wallet Docs](https://docs.perawallet.app/)
- [AlgoExplorer Testnet](https://testnet.explorer.algorand.org/)
- [AlgoNode API](https://algonode.io/)

## 🆘 Troubleshooting

### Network Connection Issues
- Verify `NEXT_PUBLIC_ALGORAND_NETWORK` is set correctly
- Check AlgoNode endpoints are accessible
- Verify firewall isn't blocking requests

### Wallet Connection Issues
- Ensure Pera Wallet extension is installed
- Check wallet is on correct network (testnet/mainnet)
- Verify account is funded (for transactions)

### Smart Contract Issues
- Verify app IDs are correct in `.env`
- Check contracts are deployed to selected network
- Verify contracts are opt-in if required

### Build/Deployment Issues
- Ensure all environment variables are set
- Check Node.js version (18+)
- Verify all dependencies are installed

