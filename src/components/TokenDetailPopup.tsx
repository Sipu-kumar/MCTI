"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Token } from "@/lib/tokenIndexer";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface TokenDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  token: Token | null;
  chain: "ethereum" | "solana" | "tron";
}

export default function TokenDetailPopup({
  isOpen,
  onClose,
  token,
  chain,
}: TokenDetailPopupProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!token) return null;

  const chainNames = {
    ethereum: "Ethereum",
    solana: "Solana",
    tron: "Tron",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            style={{ cursor: "auto" }}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[111] pointer-events-none flex items-center justify-center p-4"
            style={{ cursor: "auto" }}
          >
            <div
              className="relative w-full max-w-lg pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ cursor: "auto" }}
            >
              {/* Liquid Glass Container */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                }}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-purple-400/10 animate-pulse opacity-50 pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute top-3 right-3 z-[60] w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  type="button"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* Content */}
                <div className="relative z-10 p-4 md:p-5">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 mb-2">
                      <span className="text-xs text-white/70">{chainNames[chain]}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-1 truncate">
                      {token.name}
                    </h2>
                    <p className="text-sm text-white/70 font-mono">
                      {token.symbol}
                    </p>
                  </div>

                  {/* Token Balance - Exact Value */}
                  <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/50 mb-1.5">Token Balance</p>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-lg md:text-xl font-bold text-lime-400 font-mono break-all flex-1 leading-tight">
                        {token.balance.toLocaleString(undefined, {
                          maximumFractionDigits: 18,
                          useGrouping: true,
                        })}
                      </p>
                      <button
                        onClick={() => copyToClipboard(token.balance.toString(), "balance")}
                        className="flex-shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        type="button"
                        title="Copy balance"
                      >
                        {copiedField === "balance" ? (
                          <Check className="w-4 h-4 text-lime-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/70" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Token Details */}
                  <div className="space-y-2">
                    {token.mint && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-white/50 mb-1.5">Mint Address</p>
                        <div className="flex items-start gap-2">
                          <p className="text-xs text-white font-mono break-all flex-1 leading-tight">
                            {token.mint}
                          </p>
                          <button
                            onClick={() => copyToClipboard(token.mint!, "mint")}
                            className="flex-shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            type="button"
                            title="Copy mint address"
                          >
                            {copiedField === "mint" ? (
                              <Check className="w-3.5 h-3.5 text-lime-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-white/70" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {token.error && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-red-400 font-medium">{token.error}</p>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-white/50 mb-1.5">Token Information</p>
                      <div className="space-y-1 text-xs text-white/70">
                        <div className="flex justify-between">
                          <span>Chain:</span>
                          <span className="text-white">{chainNames[chain]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Symbol:</span>
                          <span className="text-white font-mono">{token.symbol}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span className="text-white truncate ml-2">{token.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

