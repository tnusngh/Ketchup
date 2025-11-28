"use client";

import { useState } from "react";
import { usePeraWallet } from "@/hooks/usePeraWallet";
import { initiatePayroll, sendPayrollTransaction } from "@/lib/api/payroll";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { WalletConnect } from "../wallet/WalletConnect";
import algosdk from "algosdk";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface PayrollTransactionProps {
  employeeAddress: string;
  employeeName: string;
  amount: number;
  period: string;
  currency?: string;
}

export function PayrollTransaction({
  employeeAddress,
  employeeName,
  amount,
  period,
  currency = "ALGO",
}: PayrollTransactionProps) {
  const { isConnected, address, signTransaction } = usePeraWallet();
  const [status, setStatus] = useState<
    "idle" | "creating" | "signing" | "sending" | "success" | "error"
  >("idle");
  const [txid, setTxid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePayroll = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setStatus("creating");
      setError(null);

      // Step 1: Create transaction
      const response = await initiatePayroll({
        employeeAddress,
        amount,
        period,
        currency,
        description: `Payroll for ${period} - ${employeeName}`,
      });

      if (!response.success || !response.transaction) {
        throw new Error("Failed to create transaction");
      }

      setStatus("signing");

      // Step 2: Decode and sign transaction
      const txnBytes = Buffer.from(response.transaction, "base64");
      const unsignedTxn = algosdk.decodeUnsignedTransaction(txnBytes);

      // Update sender address to connected wallet
      unsignedTxn.from = algosdk.decodeAddress(address);

      // Encode transaction for signing
      const encodedTxn = algosdk.encodeUnsignedTransaction(unsignedTxn);

      // Sign transaction
      const signedTxns = await signTransaction(encodedTxn);

      if (!signedTxns || signedTxns.length === 0) {
        throw new Error("Transaction signing failed");
      }

      setStatus("sending");

      // Step 3: Send transaction
      // Pera Wallet returns signed transaction as Uint8Array
      const signedTxnBytes = signedTxns[0];
      const sendResponse = await sendPayrollTransaction(
        Buffer.from(signedTxnBytes).toString("base64")
      );

      if (sendResponse.success && sendResponse.txid) {
        setTxid(sendResponse.txid);
        setStatus("success");
      } else {
        throw new Error("Failed to send transaction");
      }
    } catch (err: any) {
      console.error("Payroll error:", err);
      setError(err.message || "Failed to process payroll");
      setStatus("error");
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payroll Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <WalletConnect />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initiate Payroll Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Employee:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {employeeName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Address:
            </span>
            <span className="text-sm font-mono text-gray-900 dark:text-white">
              {employeeAddress.slice(0, 8)}...{employeeAddress.slice(-6)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Amount:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {amount} {currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Period:
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {period}
            </span>
          </div>
        </div>

        {status === "success" && txid && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-200">
                  Transaction Successful!
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 font-mono mt-1">
                  TXID: {txid}
                </p>
              </div>
            </div>
          </div>
        )}

        {status === "error" && error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-sm font-medium text-red-900 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        )}

        <Button
          variant="primary"
          className="w-full"
          onClick={handlePayroll}
          disabled={
            status === "creating" ||
            status === "signing" ||
            status === "sending" ||
            status === "success"
          }
        >
          {status === "creating" && (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Transaction...
            </>
          )}
          {status === "signing" && (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing Transaction...
            </>
          )}
          {status === "sending" && (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Transaction...
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Transaction Complete
            </>
          )}
          {status === "idle" && "Initiate Payroll Payment"}
          {status === "error" && "Retry Payment"}
        </Button>
      </CardContent>
    </Card>
  );
}

