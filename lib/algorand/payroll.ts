import algosdk from "algosdk";
import { getAlgodClient, APP_IDS, MIN_TXN_FEE } from "./config";

export interface PayrollTransaction {
  employeeAddress: string;
  amount: number; // in microAlgos
  period: string; // e.g., "2024-01"
  currency?: string;
  description?: string;
}

/**
 * Create a payroll payment transaction
 */
export async function createPayrollTransaction(
  fromAddress: string,
  payrollData: PayrollTransaction
): Promise<algosdk.Transaction> {
  const algodClient = getAlgodClient();
  
  // Get suggested transaction parameters
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Create payment transaction
  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: fromAddress,
    to: payrollData.employeeAddress,
    amount: payrollData.amount,
    suggestedParams: {
      ...suggestedParams,
      fee: MIN_TXN_FEE,
    },
    note: new Uint8Array(
      Buffer.from(
        JSON.stringify({
          type: "payroll",
          period: payrollData.period,
          currency: payrollData.currency || "ALGO",
          description: payrollData.description,
        })
      )
    ),
  });
  
  return transaction;
}

/**
 * Create a payroll transaction using smart contract (if using app call)
 */
export async function createPayrollAppCall(
  fromAddress: string,
  payrollData: PayrollTransaction
): Promise<algosdk.Transaction> {
  const algodClient = getAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Encode payroll data
  const payrollDataEncoded = algosdk.encodeObj({
    employee: payrollData.employeeAddress,
    amount: payrollData.amount,
    period: payrollData.period,
  });
  
  // Create app call transaction
  const transaction = algosdk.makeApplicationCallTxnFromObject({
    from: fromAddress,
    appIndex: Number(APP_IDS.PAYROLL_APP),
    suggestedParams: {
      ...suggestedParams,
      fee: MIN_TXN_FEE,
    },
    appArgs: [new Uint8Array(Buffer.from("payroll")), payrollDataEncoded],
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
  });
  
  return transaction;
}

/**
 * Sign and send transaction (for server-side use with mnemonic)
 */
export async function signAndSendTransaction(
  transaction: algosdk.Transaction,
  privateKey: Uint8Array
): Promise<string> {
  const algodClient = getAlgodClient();
  
  // Sign transaction
  const signedTxn = transaction.signTxn(privateKey);
  
  // Send transaction
  const { txid } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txid, 4);
  
  return txid;
}

/**
 * Get transaction details
 */
export async function getTransactionDetails(txid: string) {
  const algodClient = getAlgodClient();
  const transaction = await algodClient.pendingTransactionInformation(txid).do();
  return transaction;
}


