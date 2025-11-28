"use client";

import { useState, useEffect, useCallback } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect({
  chainId: 416002, // Testnet, use 416001 for Mainnet
});

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
}

export function usePeraWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false,
  });

  // Check if wallet is already connected on mount
  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length > 0) {
          setWalletState({
            isConnected: true,
            address: accounts[0],
            isConnecting: false,
          });
        }
      })
      .catch(() => {
        // Not connected
      });
  }, []);

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      setWalletState((prev) => ({ ...prev, isConnecting: true }));
      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        setWalletState({
          isConnected: true,
          address: accounts[0],
          isConnecting: false,
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setWalletState((prev) => ({ ...prev, isConnecting: false }));
      throw error;
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      await peraWallet.disconnect();
      setWalletState({
        isConnected: false,
        address: null,
        isConnecting: false,
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      throw error;
    }
  }, []);

  // Sign transaction
  const signTransaction = useCallback(
    async (txn: Uint8Array | Uint8Array[]) => {
      if (!walletState.address) {
        throw new Error("Wallet not connected");
      }

      try {
        // Pera Wallet expects an array of transactions
        const transactions = Array.isArray(txn) ? txn : [txn];
        const signedTxns = await peraWallet.signTransaction(transactions);
        return signedTxns;
      } catch (error) {
        console.error("Error signing transaction:", error);
        throw error;
      }
    },
    [walletState.address]
  );

  return {
    ...walletState,
    connect,
    disconnect,
    signTransaction,
    peraWallet,
  };
}

