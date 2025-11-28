import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface PayrollRequest {
  employeeAddress: string;
  amount: number;
  period: string;
  currency?: string;
  description?: string;
}

export interface PayrollResponse {
  success: boolean;
  transaction?: string;
  transactionData?: any;
  txid?: string;
  message?: string;
}

/**
 * Initiate a payroll transaction
 * Returns unsigned transaction that needs to be signed by wallet
 */
export async function initiatePayroll(
  data: PayrollRequest
): Promise<PayrollResponse> {
  const response = await axios.post(`${API_BASE_URL}/payroll/initiate`, data);
  return response.data;
}

/**
 * Send signed transaction to Algorand network
 */
export async function sendPayrollTransaction(
  signedTransaction: string
): Promise<PayrollResponse> {
  const response = await axios.post(`${API_BASE_URL}/payroll/send`, {
    signedTransaction,
  });
  return response.data;
}

/**
 * Get transaction status
 */
export async function getPayrollStatus(txid: string): Promise<any> {
  const response = await axios.get(`${API_BASE_URL}/payroll/status`, {
    params: { txid },
  });
  return response.data;
}


