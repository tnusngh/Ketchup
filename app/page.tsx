"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WalletBadge } from "@/components/atoms/WalletBadge";
import { WalletModal } from "@/components/wallet/WalletModal";
import {
  Building2,
  Users,
  UserCog,
  Briefcase,
  Shield,
  ArrowRight,
  Wallet,
  Globe,
  Lock,
  Zap,
} from "lucide-react";

const roles = [
  {
    id: 'employer',
    title: 'Employer',
    description: 'Monitor workforce, manage operations, and oversee exit workflows',
    icon: Building2,
    path: '/employer',
    color: 'primary',
  },
  {
    id: 'hr',
    title: 'HR Admin',
    description: 'Handle onboarding, employee management, and exit processes',
    icon: UserCog,
    path: '/hr',
    color: 'success',
  },
  {
    id: 'employee',
    title: 'Employee',
    description: 'Track tasks, manage leaves, view salary and achievements',
    icon: Users,
    path: '/employee',
    color: 'warning',
  },
  {
    id: 'manager',
    title: 'Manager',
    description: 'Oversee team performance with audited access controls',
    icon: Briefcase,
    path: '/manager',
    color: 'accent',
  },
];

const features = [
  {
    icon: Wallet,
    title: 'Decentralized Identity',
    description: 'Connect your Pera Algo Wallet for portable work credentials',
  },
  {
    icon: Shield,
    title: 'Verified Work Proofs',
    description: 'On-chain verification of employment and achievements',
  },
  {
    icon: Globe,
    title: 'Portable Experience',
    description: 'Export your work history to any future employer',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'You control what data is shared and with whom',
  },
];

export default function Home() {
  const [walletModal, setWalletModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-base font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-bold text-xl text-foreground">KETCHUP</span>
          </div>
          <div className="flex items-center gap-3">
            <WalletBadge
              connected={walletConnected}
              address="0x1234...5678"
              className="cursor-pointer"
            />
            <Button
              variant={walletConnected ? 'outline' : 'default'}
              onClick={() => setWalletModal(true)}
            >
              {walletConnected ? 'Connected' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              Decentralized HR Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Modern HR with{' '}
              <span className="text-gradient">Blockchain</span>{' '}
              Credentials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              KETCHUP revolutionizes human resources with decentralized identity and portable work proofs via Pera Algo Wallet. Own your work history, forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => setWalletModal(true)}>
                <Wallet className="h-5 w-5 mr-2" />
                Connect Pera Wallet
              </Button>
              <Button size="lg" variant="outline">
                Learn More
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Select Your Role
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Access your personalized dashboard based on your role in the organization
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <Link
                  key={role.id}
                  href={role.path}
                  className="group relative rounded-xl border bg-card p-6 text-left shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center mb-4 ${
                      role.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : role.color === 'success'
                        ? 'bg-success/10 text-success'
                        : role.color === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {role.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    <span>Enter Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blockchain Info */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto rounded-2xl border bg-card p-8 md:p-12 shadow-card">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  <Shield className="h-3.5 w-3.5" />
                  On-chain Verified
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Portable Work Credentials
                </h2>
                <p className="text-muted-foreground">
                  Your employment history, achievements, and work proofs are stored securely on the Algorand blockchain. Export your verified credentials to any employer, anywhere in the world.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Button onClick={() => setWalletModal(true)}>
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Pera Wallet
                  </Button>
                  <Button variant="outline">View Demo</Button>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="rounded-xl border bg-muted/30 p-6 space-y-4 min-w-[280px]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Employment Verified</p>
                      <p className="text-xs text-muted-foreground">KETCHUP Inc.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Role Verified</p>
                      <p className="text-xs text-muted-foreground">Senior Developer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">342 Tasks Completed</p>
                      <p className="text-xs text-muted-foreground">Avg Score: 92%</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono pt-2 border-t">
                    On-chain • Algorand Mainnet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-bold text-foreground">KETCHUP</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 KETCHUP. Decentralized HR Platform.
          </p>
        </div>
      </footer>

      <WalletModal
        open={walletModal}
        onOpenChange={setWalletModal}
        mode="connect"
      />
    </div>
  );
}
