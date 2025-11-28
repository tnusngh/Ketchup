# Ketchup HR Frontend - Setup Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- Pera Algo Wallet browser extension (for wallet integration)
- Algorand testnet/mainnet account (for testing)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `NEXT_PUBLIC_ALGORAND_NETWORK`: `testnet` or `mainnet`
   - `NEXT_PUBLIC_PAYROLL_APP_ID`: Your deployed payroll smart contract app ID
   - `NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID`: Your employment registry app ID

3. **Run development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:2000`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes (backend)
│   │   └── payroll/       # Payroll transaction endpoints
│   ├── employer/          # Employer dashboard
│   ├── hr/                # HR dashboard
│   ├── employee/          # Employee dashboard
│   └── manager/           # Manager dashboard
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── wallet/            # Wallet integration components
│   └── payroll/           # Payroll components
├── lib/                   # Utility libraries
│   ├── algorand/          # Algorand SDK utilities
│   └── api/               # API client functions
├── hooks/                 # React hooks
│   └── usePeraWallet.ts   # Pera Wallet integration hook
├── types/                 # TypeScript type definitions
└── lib/                   # Shared utilities
```

## Features

### Backend (API Routes)

- **POST `/api/payroll/initiate`**: Create unsigned payroll transaction
- **POST `/api/payroll/send`**: Send signed transaction to Algorand
- **GET `/api/payroll/status`**: Check transaction status

### Wallet Integration

- Pera Algo Wallet connection
- Transaction signing
- Wallet state management

### Payroll Transactions

- Create payroll payments on Algorand
- Sign transactions with Pera Wallet
- Track transaction status
- Support for multiple currencies

## Usage

### Connecting Wallet

1. Install Pera Algo Wallet browser extension
2. Click "Connect Wallet" button
3. Approve connection in Pera Wallet popup

### Initiating Payroll

1. Ensure wallet is connected
2. Enter employee details and amount
3. Click "Initiate Payroll Payment"
4. Approve transaction in Pera Wallet
5. Transaction will be sent to Algorand network

## Development

### Adding New API Routes

Create files in `app/api/[route-name]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true });
}
```

### Adding Wallet Functionality

Use the `usePeraWallet` hook:

```typescript
import { usePeraWallet } from "@/hooks/usePeraWallet";

function MyComponent() {
  const { isConnected, address, connect, signTransaction } = usePeraWallet();
  // ...
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ALGORAND_NETWORK` | Algorand network (testnet/mainnet) | Yes |
| `NEXT_PUBLIC_PAYROLL_APP_ID` | Payroll smart contract app ID | No |
| `NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID` | Employment registry app ID | No |
| `EMPLOYER_WALLET_ADDRESS` | Employer wallet for server-side transactions | No |

## Testing

1. Use Algorand Testnet for development
2. Get testnet ALGO from [Algorand Testnet Faucet](https://bank.testnet.algorand.network/)
3. Test wallet connection and transactions

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Wallet Connection Issues
- Ensure Pera Wallet extension is installed
- Check browser console for errors
- Try disconnecting and reconnecting

### Transaction Errors
- Verify sufficient ALGO balance for fees
- Check network configuration (testnet vs mainnet)
- Verify smart contract app IDs are correct

