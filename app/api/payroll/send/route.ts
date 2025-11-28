import { NextRequest, NextResponse } from "next/server";
import algosdk from "algosdk";
import { getAlgodClient } from "@/lib/algorand/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signedTransaction } = body;

    if (!signedTransaction) {
      return NextResponse.json(
        { error: "Signed transaction is required" },
        { status: 400 }
      );
    }

    // Decode the signed transaction
    const signedTxn = Buffer.from(signedTransaction, "base64");
    
    // Send transaction to Algorand network
    const algodClient = getAlgodClient();
    const { txid } = await algodClient.sendRawTransaction(signedTxn).do();

    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      txid,
      4
    );

    return NextResponse.json({
      success: true,
      txid,
      confirmedRound: confirmedTxn["confirmed-round"],
      message: "Payroll transaction sent successfully",
    });
  } catch (error: any) {
    console.error("Payroll send error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send payroll transaction" },
      { status: 500 }
    );
  }
}


