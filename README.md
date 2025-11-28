# 🧩 Decentralized HR Lifecycle on Algorand

A blockchain-powered HR management system built on **Algorand**, designed for transparent onboarding, employment, and offboarding — using **DIDs, Verifiable Credentials (VCs), and ARC-28 events** for event-driven automation.

 
> 🗂️ [**Architecture Diagram (View Here)**](<https://github.com/tnusngh/Ketchup/tree/main/architecture>)  
> 📘 [**Project Documentation (View Here)**](<https://docs.google.com/document/d/1KQrfrVOslkWWwHmRbE-CpZgHvQWvQHv_XQ7H8YF7Eyc/edit?usp=sharing>)

---

## 🌐 Overview

This project reimagines HR processes with **blockchain-verified identity, smart contracts, and decentralized storage**.  
Each user - candidate, employee, or HR - interacts transparently through on-chain state changes and verifiable credentials.

### 🔁 Core Workflow

1. **Onboarding:** Candidate applies → DID created (`did:algo`) → credentials anchored → offer accepted → employee activated.  
2. **Active Employment:** Employee manages leaves, grievances, and recognitions directly on-chain.  
3. **Offboarding:** Department clearances, atomic settlements, and NFT/VC experience letters issued immutably.

---

## ⚙️ Architecture Overview

The system follows a modular **smart contract suite (AVM / Stateful Apps)** architecture:

| App | Purpose |
|------|----------|
| **IdentityRegistryApp** | Links Algorand address ↔ DID. Manages VC issuers & revocations. |
| **CandidatePipelineApp** | Tracks interviews, offers, and onboarding transitions. |
| **EmploymentRegistryApp** | Canonical employment record (role, grade, status). |
| **LeaveManagerApp** | Manages balances, accruals, and requests with immutable audit. |
| **RecognitionApp** | Mints non-transferable ASAs/NFTs (soulbound) for achievements. |
| **GrievanceDeskApp** | Handles issue intake, routing, and resolution timelines. |
| **OffboardingApp** | Manages department clearance, final settlements, and credential issuance. |

All contracts emit **ARC-28 events**, consumed by an off-chain **AlgoKit Subscriber** to trigger:
- Email/SSO provisioning  
- Payroll and Finance sync  
- IT access updates

---

## 🧱 Data & Storage Strategy

| Layer | Description |
|--------|--------------|
| **Global / Local State** | Compact facts (status, role, manager, policy). |
| **Box Storage** | Logs like leave requests, interview stages, history (≤32KB per box). |
| **Off-Chain Storage** | Large files (PDFs, credentials, images) on IPFS/S3; content hashes stored on-chain. |

> 🛡️ Only **hashes & pointers** are stored on-chain — no personal data.

---

## 🔐 Identity & Credentials

- **Primary Identifier:** Algorand address per user  
- **DID Method:** `did:algo` — canonical decentralized identity  
- **VC Types:** Education ID, Employment Proof, KYC, Experience Letters  
- **Verification:** VC hash pinned on-chain with expiry & revocation metadata  

**Standards Used:**  
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)  
- [DIF DID Core](https://identity.foundation/)  
- [Algorand ARC-28 Events](https://algorandfoundation.github.io/ARCs/arc-0028.html)  
- [ARC-3 / ARC-19 Metadata](https://developer.algorand.org/docs/)

---

## 🧩 Event Flow Example

```mermaid
sequenceDiagram
    participant Candidate
    participant IdentityRegistryApp
    participant CandidatePipelineApp
    participant EmploymentRegistryApp
    participant Subscriber

    Candidate->>IdentityRegistryApp: Create did:algo + anchor DID Doc
    Candidate->>CandidatePipelineApp: Submit interview data
    CandidatePipelineApp-->>Subscriber: ARC-28 StageUpdated Event
    CandidatePipelineApp->>EmploymentRegistryApp: Offer Accepted → Activate Employee
    EmploymentRegistryApp-->>Subscriber: ARC-28 EmployeeActivated Event
    Subscriber-->>Systems: Trigger IT / Payroll provisioning

---

## 🖥️ Application Architecture

This repository contains a **full-stack application** for the Ketchup HR system, built with Next.js, React, and TypeScript. **Everything runs on a single server**.

### Single Server Architecture

- **Frontend**: Next.js React application (App Router)
- **Backend API**: Next.js API routes (`/app/api/*`)
- **Algorand Integration**: Client-side and server-side using AlgoKit 3
- **Wallet Integration**: Pera Wallet browser extension
- **All on One Server**: Port 2000 (configurable)

### Features

- **Multi-Dashboard System**: Separate dashboards for Employers, HR, Employees, and Managers
- **Pera Algo Wallet Integration**: Connect and sign transactions using Pera Wallet
- **Payroll Transactions**: Initiate and process payroll payments on Algorand blockchain
- **AlgoKit 3 Integration**: Modern Algorand development tools
- **Smart Contract Support**: All 8 HR smart contracts configured
- **Modern UI**: Clean, minimal interface with dark mode support
- **Responsive Design**: Works on desktop and mobile devices

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:2000`

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### Algorand Environment Configuration

The application is fully configured for the Algorand blockchain environment:

- **AlgoKit 3**: Modern Algorand development tools
- **Network Support**: Testnet, Mainnet, Betanet
- **Smart Contracts**: All 8 HR smart contracts configured
- **Wallet Integration**: Pera Wallet for transactions
- **Single Server**: Everything runs on one Next.js server

See [ALGORAND_ENVIRONMENT_SETUP.md](./ALGORAND_ENVIRONMENT_SETUP.md) for detailed Algorand configuration.

See [SINGLE_SERVER_SETUP.md](./SINGLE_SERVER_SETUP.md) for server architecture details.

### Requirements

- **Node.js**: 18+ 
- **npm** or **yarn**
- **Pera Algo Wallet**: Browser extension for wallet integration
- **Algorand Account**: Testnet or Mainnet account for testing

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # Backend API routes
│   │   └── payroll/       # Payroll transaction endpoints
│   ├── employer/          # Employer dashboard pages
│   ├── hr/                # HR dashboard pages
│   ├── employee/          # Employee dashboard pages
│   └── manager/           # Manager dashboard pages
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── wallet/            # Wallet integration
│   └── payroll/           # Payroll components
├── lib/                   # Utilities
│   ├── algorand/          # Algorand SDK integration
│   └── api/               # API client functions
├── hooks/                 # React hooks
│   └── usePeraWallet.ts   # Pera Wallet hook
└── types/                 # TypeScript definitions
```

### API Endpoints

- `POST /api/payroll/initiate` - Create payroll transaction
- `POST /api/payroll/send` - Send signed transaction
- `GET /api/payroll/status` - Check transaction status

### Wallet Integration

The frontend uses **Pera Algo Wallet** for:
- Wallet connection and authentication
- Transaction signing
- Account management

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_ALGORAND_NETWORK` | Network (testnet/mainnet/betanet) | `testnet` |
| `NEXT_PUBLIC_PAYROLL_APP_ID` | Payroll smart contract ID | `0` |
| `NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID` | Employment registry app ID | `0` |
| `NEXT_PUBLIC_IDENTITY_REGISTRY_APP_ID` | Identity registry app ID | `0` |
| `NEXT_PUBLIC_CANDIDATE_PIPELINE_APP_ID` | Candidate pipeline app ID | `0` |
| `NEXT_PUBLIC_LEAVE_MANAGER_APP_ID` | Leave manager app ID | `0` |
| `NEXT_PUBLIC_RECOGNITION_APP_ID` | Recognition app ID | `0` |
| `NEXT_PUBLIC_GRIEVANCE_DESK_APP_ID` | Grievance desk app ID | `0` |
| `NEXT_PUBLIC_OFFBOARDING_APP_ID` | Offboarding app ID | `0` |
| `PORT` | Server port | `2000` |

See `.env.example` for complete configuration template.

---

