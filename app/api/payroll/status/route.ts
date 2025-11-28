import { NextRequest, NextResponse } from "next/server";
import { getAlgodClient } from "@/lib/algorand/config";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const txid = searchParams.get("txid");

    if (!txid) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const algodClient = getAlgodClient();
    const transaction = await algodClient
      .pendingTransactionInformation(txid)
      .do();

    // Check if transaction is confirmed
    if (transaction["confirmed-round"]) {
      const confirmedTxn = await algodClient
        .transactionInformation(txid)
        .do();

      return NextResponse.json({
        success: true,
        status: "confirmed",
        txid,
        confirmedRound: confirmedTxn["confirmed-round"],
        transaction: confirmedTxn,
      });
    }

    return NextResponse.json({
      success: true,
      status: "pending",
      txid,
      transaction,
    });
  } catch (error: any) {
    console.error("Payroll status error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get transaction status" },
      { status: 500 }
    );
  }
}


