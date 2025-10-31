# 🧩 Decentralized HR Lifecycle on Algorand

A blockchain-powered HR management system built on **Algorand**, designed for transparent onboarding, employment, and offboarding — using **DIDs, Verifiable Credentials (VCs), and ARC-28 events** for event-driven automation.

 
> 🗂️ [**Architecture Diagram (View Here)**](<https://github.com/Eshan-Sharma/ketchup>)  
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

