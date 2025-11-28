import { Wallet, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletBadgeProps {
  connected: boolean;
  address?: string;
  className?: string;
}

export function WalletBadge({ connected, address, className }: WalletBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
        connected
          ? "bg-success/10 text-success border border-success/20"
          : "bg-muted text-muted-foreground border border-border",
        className
      )}
    >
      <Wallet className="h-3.5 w-3.5" />
      {connected ? (
        <>
          <span className="hidden sm:inline">{address}</span>
          <CheckCircle className="h-3.5 w-3.5" />
        </>
      ) : (
        <span>Connect Wallet</span>
      )}
    </div>
  );
}
