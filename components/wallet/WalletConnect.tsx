"use client";

import { usePeraWallet } from "@/hooks/usePeraWallet";
import { Button } from "../ui/Button";
import { Wallet, LogOut, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/Card";

export function WalletConnect() {
  const { isConnected, address, isConnecting, connect, disconnect } =
    usePeraWallet();

  const formatAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Wallet Connected
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {formatAddress(address)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={disconnect}>
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Connect Wallet
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Connect Pera Algo Wallet to proceed
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={connect}
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


