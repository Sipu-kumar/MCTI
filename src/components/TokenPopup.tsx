"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Token } from "@/lib/tokenIndexer";
import TokenCard from "./TokenCard";
import TokenDetailPopup from "./TokenDetailPopup";
import { useEffect, useState } from "react";
import { truncateAddress } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface TokenPopupProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  ethTokens: Token[];
  solTokens: Token[];
  tronTokens: Token[];
  loading: boolean;
}

export default function TokenPopup({
  isOpen,
  onClose,
  address,
  ethTokens,
  solTokens,
  tronTokens,
  loading,
}: TokenPopupProps) {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Token detail popup state
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedChain, setSelectedChain] = useState<"ethereum" | "solana" | "tron">("ethereum");
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  
  const handleTokenClick = (token: Token, chain: "ethereum" | "solana" | "tron") => {
    setSelectedToken(token);
    setSelectedChain(chain);
    setIsDetailPopupOpen(true);
  };
  
  // Combine all tokens from all chains into a single array with chain info
  const allTokens: Array<{ token: Token; chain: "ethereum" | "solana" | "tron" }> = [];
  
  ethTokens.forEach(token => {
    allTokens.push({ token, chain: "ethereum" });
  });
  
  solTokens.forEach(token => {
    allTokens.push({ token, chain: "solana" });
  });
  
  tronTokens.forEach(token => {
    allTokens.push({ token, chain: "tron" });
  });
  
  const hasTokens = allTokens.length > 0;

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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            style={{ cursor: "auto" }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] pointer-events-none"
            style={{ cursor: "auto" }}
          >
            <div
              className="relative w-full h-full pointer-events-auto"
              style={{ cursor: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Liquid Glass Container */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden overflow-x-hidden"
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
                  className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Token Indexer
                    </h2>
                    <div className="flex items-center gap-2">
                      <p 
                        className="text-white/70 text-sm md:text-base font-mono cursor-pointer hover:text-white transition-colors"
                        onClick={() => setShowFullAddress(!showFullAddress)}
                        title={showFullAddress ? "Click to hide full address" : "Click to show full address"}
                      >
                        {showFullAddress ? address : truncateAddress(address)}
                      </p>
                      <button
                        onClick={() => setShowFullAddress(!showFullAddress)}
                        className="text-white/50 hover:text-white/80 transition-colors p-1"
                        type="button"
                        title={showFullAddress ? "Hide full address" : "Show full address"}
                      >
                        {showFullAddress ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Loading State */}
                  {loading && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-lime-400 border-t-transparent mb-4" />
                        <p className="text-white/70">Indexing tokens...</p>
                      </div>
                    </div>
                  )}

                  {/* No Tokens State */}
                  {!loading && !hasTokens && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-white/70 text-lg mb-2">No tokens found</p>
                        <p className="text-white/50 text-sm">
                          This address doesn&apos;t have any tokens on the detected chain.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Token Cards Grid */}
                  {!loading && hasTokens && (
                    <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {allTokens.map(({ token, chain }, i) => (
                          <TokenCard 
                            key={`${chain}-${i}`}
                            token={token} 
                            chain={chain}
                            onClick={() => handleTokenClick(token, chain)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
      
      {/* Token Detail Popup */}
      <TokenDetailPopup
        isOpen={isDetailPopupOpen}
        onClose={() => setIsDetailPopupOpen(false)}
        token={selectedToken}
        chain={selectedChain}
      />
    </AnimatePresence>
  );
}

