import algosdk from "algosdk";
import { getAlgoClient, getAlgoIndexerClient, getAlgoNodeConfig } from "@algorandfoundation/algokit-utils";

// Algorand network configuration
export const ALGORAND_NETWORK = process.env.NEXT_PUBLIC_ALGORAND_NETWORK || "testnet";

// Algorand API endpoints (fallback if AlgoKit defaults don't work)
const ALGORAND_API_ENDPOINTS = {
  mainnet: "https://mainnet-api.algonode.cloud",
  testnet: "https://testnet-api.algonode.cloud",
  betanet: "https://betanet-api.algonode.cloud",
};

const INDEXER_ENDPOINTS = {
  mainnet: "https://mainnet-idx.algonode.cloud",
  testnet: "https://testnet-idx.algonode.cloud",
  betanet: "https://betanet-idx.algonode.cloud",
};

// Get Algod client using AlgoKit 3 utilities
export function getAlgodClient() {
  try {
    // Use AlgoKit's getAlgoClient with AlgoNode config for testnet/mainnet
    if (ALGORAND_NETWORK === "testnet" || ALGORAND_NETWORK === "mainnet") {
      return getAlgoClient(getAlgoNodeConfig(ALGORAND_NETWORK as "testnet" | "mainnet", "algod"));
    }
    // Fallback for betanet or custom endpoints
    const endpoint = ALGORAND_API_ENDPOINTS[ALGORAND_NETWORK as keyof typeof ALGORAND_API_ENDPOINTS] || ALGORAND_API_ENDPOINTS.testnet;
    return getAlgoClient({ server: endpoint, port: "", token: "" });
  } catch (error) {
    // Fallback to direct algosdk client if AlgoKit fails
    const endpoint = ALGORAND_API_ENDPOINTS[ALGORAND_NETWORK as keyof typeof ALGORAND_API_ENDPOINTS] || ALGORAND_API_ENDPOINTS.testnet;
    return new algosdk.Algodv2("", endpoint, "");
  }
}

// Get Indexer client using AlgoKit 3 utilities
export function getIndexerClient() {
  try {
    // Use AlgoKit's getAlgoIndexerClient with AlgoNode config for testnet/mainnet
    if (ALGORAND_NETWORK === "testnet" || ALGORAND_NETWORK === "mainnet") {
      return getAlgoIndexerClient(getAlgoNodeConfig(ALGORAND_NETWORK as "testnet" | "mainnet", "indexer"));
    }
    // Fallback for betanet or custom endpoints
    const endpoint = INDEXER_ENDPOINTS[ALGORAND_NETWORK as keyof typeof INDEXER_ENDPOINTS] || INDEXER_ENDPOINTS.testnet;
    return getAlgoIndexerClient({ server: endpoint, port: "", token: "" });
  } catch (error) {
    // Fallback to direct algosdk client if AlgoKit fails
    const endpoint = INDEXER_ENDPOINTS[ALGORAND_NETWORK as keyof typeof INDEXER_ENDPOINTS] || INDEXER_ENDPOINTS.testnet;
    return new algosdk.Indexer("", endpoint, "");
  }
}

// Application IDs (these would be your deployed smart contract IDs)
export const APP_IDS = {
  PAYROLL_APP: process.env.NEXT_PUBLIC_PAYROLL_APP_ID || "0",
  EMPLOYMENT_REGISTRY: process.env.NEXT_PUBLIC_EMPLOYMENT_REGISTRY_APP_ID || "0",
  IDENTITY_REGISTRY: process.env.NEXT_PUBLIC_IDENTITY_REGISTRY_APP_ID || "0",
  CANDIDATE_PIPELINE: process.env.NEXT_PUBLIC_CANDIDATE_PIPELINE_APP_ID || "0",
  LEAVE_MANAGER: process.env.NEXT_PUBLIC_LEAVE_MANAGER_APP_ID || "0",
  RECOGNITION: process.env.NEXT_PUBLIC_RECOGNITION_APP_ID || "0",
  GRIEVANCE_DESK: process.env.NEXT_PUBLIC_GRIEVANCE_DESK_APP_ID || "0",
  OFFBOARDING: process.env.NEXT_PUBLIC_OFFBOARDING_APP_ID || "0",
};

// Minimum transaction fee (in microAlgos)
export const MIN_TXN_FEE = 1000;


