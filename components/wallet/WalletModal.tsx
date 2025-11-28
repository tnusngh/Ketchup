import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink, Shield, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'connect' | 'view' | 'export';
}

export function WalletModal({ open, onOpenChange, mode }: WalletModalProps) {
  const titles = {
    connect: 'Connect Pera Algo Wallet',
    view: 'View Credentials',
    export: 'Export Work Proof',
  };

  const descriptions = {
    connect: 'Connect your decentralized wallet to sync portable credentials',
    view: 'Your on-chain verified work credentials',
    export: 'Export your verified experience to the blockchain',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            {titles[mode]}
          </DialogTitle>
          <DialogDescription>{descriptions[mode]}</DialogDescription>
        </DialogHeader>

        {mode === 'connect' && (
          <div className="space-y-4 py-4">
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Pera Algo Wallet</p>
                  <p className="text-sm text-muted-foreground">Algorand Ecosystem</p>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="wallet">
              Connect Wallet
              <ExternalLink className="h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By connecting, you agree to our Terms of Service
            </p>
          </div>
        )}

        {mode === 'view' && (
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {[
                { label: 'Employment Verified', date: '2023-03-15', issuer: 'KETCHUP Inc.' },
                { label: 'Senior Developer Role', date: '2024-01-10', issuer: 'HR Department' },
                { label: 'Performance Badge', date: '2024-01-15', issuer: 'Manager' },
              ].map((credential, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{credential.label}</p>
                        <p className="text-xs text-muted-foreground">
                          Issued by {credential.issuer}
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-mono">On-chain</span> • Verified {credential.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'export' && (
          <div className="space-y-4 py-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Export Experience</p>
                  <p className="text-sm text-muted-foreground">Create portable work proof</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tenure</span>
                  <span className="font-medium">2 years, 3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Quality Score</span>
                  <span className="font-medium text-success">92%</span>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="wallet">
              Export to Blockchain
              <ExternalLink className="h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              This will create a verifiable credential on Algorand
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
