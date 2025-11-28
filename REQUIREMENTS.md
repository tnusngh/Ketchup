# Ketchup HR Frontend - Requirements

## System Requirements

### Development Environment

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (or yarn 1.22.0+)
- **Git**: For version control
- **Code Editor**: VS Code recommended (with extensions for TypeScript, ESLint)

### Browser Requirements

- **Chrome/Edge**: Version 90+ (recommended for Pera Wallet)
- **Firefox**: Version 88+
- **Safari**: Version 14+

### Required Browser Extensions

- **Pera Algo Wallet**: [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/pera-algo-wallet/lghipjgeodkhihjmbnfljamblajbgmig) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/pera-algo-wallet/)

## Dependencies

### Core Dependencies

- **Next.js**: 14.2.5+ (React framework)
- **React**: 18.3.1+ (UI library)
- **TypeScript**: 5.5.4+ (Type safety)
- **Tailwind CSS**: 3.4.7+ (Styling)

### Blockchain Integration

- **@perawallet/connect**: 1.1.0+ (Pera Wallet SDK)
- **algosdk**: 2.7.0+ (Algorand SDK)

### UI Libraries

- **lucide-react**: 0.427.0+ (Icons)
- **clsx**: 2.1.1+ (Conditional classes)
- **tailwind-merge**: 2.5.2+ (Tailwind class merging)

### API Client

- **axios**: 1.6.8+ (HTTP client)

## Development Tools

- **ESLint**: 8.57.0+ (Code linting)
- **PostCSS**: 8.4.40+ (CSS processing)
- **Autoprefixer**: 10.4.20+ (CSS vendor prefixes)

## Algorand Network Access

- **Testnet Access**: Required for development
  - Testnet Faucet: https://bank.testnet.algonode.cloud/
  - Testnet Explorer: https://testnet.explorer.algorand.org/
  
- **Mainnet Access**: Required for production
  - Mainnet Explorer: https://explorer.algorand.org/

## Smart Contract Requirements

### Application IDs

You need the following smart contract application IDs (deployed on Algorand):

1. **Payroll Application ID**: For processing payroll transactions
2. **Employment Registry Application ID**: For employee records

These can be set in `.env` file:
```
NEXT_PUBLIC_PAYROLL_APP_ID=your_app_id
NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=your_app_id
```

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Algorand Network
NEXT_PUBLIC_ALGORAND_NETWORK=testnet

# Smart Contract IDs
NEXT_PUBLIC_PAYROLL_APP_ID=0
NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID=0

# API Configuration
NEXT_PUBLIC_API_URL=/api
```

### Optional Environment Variables

```env
# For server-side transaction creation (not recommended for production)
EMPLOYER_WALLET_ADDRESS=your_wallet_address
```

## Installation Steps

1. **Clone repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Ketchup-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Install Pera Wallet extension**
   - Chrome: https://chrome.google.com/webstore/detail/pera-algo-wallet/lghipjgeodkhihjmbnfljamblajbgmig
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/pera-algo-wallet/

5. **Get testnet ALGO** (for testing)
   - Visit: https://bank.testnet.algonode.cloud/
   - Request testnet ALGO to your wallet address

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open browser**
   - Navigate to: http://localhost:2000

## Production Requirements

### Build Requirements

- Node.js 18+ on build server
- Sufficient disk space for `node_modules` (~500MB)
- Network access to npm registry

### Runtime Requirements

- Node.js 18+ runtime
- Minimum 512MB RAM
- Port 2000 (or configured port) available

### Build Command

```bash
npm run build
npm start
```

## Testing Requirements

### Testnet Setup

1. Create testnet Algorand account
2. Fund with testnet ALGO
3. Deploy test smart contracts
4. Update `.env` with testnet app IDs

### Wallet Testing

1. Install Pera Wallet extension
2. Create/import testnet account
3. Fund account with testnet ALGO
4. Test connection and transactions

## Troubleshooting

### Common Issues

1. **Wallet not connecting**
   - Ensure Pera Wallet extension is installed
   - Check browser console for errors
   - Try refreshing the page

2. **Transaction failures**
   - Verify sufficient ALGO balance (for fees)
   - Check network configuration (testnet vs mainnet)
   - Verify smart contract app IDs

3. **Build errors**
   - Clear `node_modules` and reinstall
   - Check Node.js version (18+)
   - Verify all environment variables are set

## Support

For issues or questions:
- Check [SETUP.md](./SETUP.md) for setup instructions
- Review project documentation
- Check Algorand developer docs: https://developer.algorand.org/

