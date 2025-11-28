import { NextRequest, NextResponse } from "next/server";
import algosdk from "algosdk";
import { createPayrollTransaction, getAlgodClient } from "@/lib/algorand/payroll";
import { getAlgodClient as getClient } from "@/lib/algorand/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeAddress, amount, period, currency, description } = body;

    // Validate input
    if (!employeeAddress || !amount || !period) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate Algorand address
    if (!algosdk.isValidAddress(employeeAddress)) {
      return NextResponse.json(
        { error: "Invalid Algorand address" },
        { status: 400 }
      );
    }

    // For server-side: you would use the employer's address from environment
    // For client-side: the transaction will be created and signed by the wallet
    const employerAddress = process.env.EMPLOYER_WALLET_ADDRESS;
    
    if (!employerAddress) {
      // Return unsigned transaction for client-side signing
      const transaction = await createPayrollTransaction(
        employeeAddress, // This will be replaced by the actual sender
        {
          employeeAddress,
          amount: Number(amount),
          period,
          currency: currency || "ALGO",
          description,
        }
      );

      // Convert transaction to base64 for client-side signing
      const txnBytes = algosdk.encodeUnsignedTransaction(transaction);
      const txnBase64 = Buffer.from(txnBytes).toString("base64");

      return NextResponse.json({
        success: true,
        transaction: txnBase64,
        transactionData: {
          from: transaction.from.toString(),
          to: transaction.to.toString(),
          amount: transaction.amount.toString(),
          note: transaction.note ? Buffer.from(transaction.note).toString() : "",
        },
      });
    }

    // If employer address is set, create and return transaction details
    // (In production, you'd sign this server-side with a secure key management system)
    const transaction = await createPayrollTransaction(employerAddress, {
      employeeAddress,
      amount: Number(amount),
      period,
      currency: currency || "ALGO",
      description,
    });

    const txnBytes = algosdk.encodeUnsignedTransaction(transaction);
    const txnBase64 = Buffer.from(txnBytes).toString("base64");

    return NextResponse.json({
      success: true,
      transaction: txnBase64,
      message: "Transaction created. Sign with wallet to send.",
    });
  } catch (error: any) {
    console.error("Payroll initiation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate payroll transaction" },
      { status: 500 }
    );
  }
}


