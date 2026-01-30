import { Token } from "@/lib/tokenIndexer";
import { twMerge } from "tailwind-merge";
import { Coins, Sparkles, Zap } from "lucide-react";
import { formatTokenBalance } from "@/lib/utils";

interface TokenCardProps {
  token: Token;
  chain: "ethereum" | "solana" | "tron";
  onClick?: () => void;
}

export default function TokenCard({ token, chain, onClick }: TokenCardProps) {
  const chainColors = {
    ethereum: "from-blue-500/20 to-cyan-500/20 border-blue-400/30",
    solana: "from-purple-500/20 to-pink-500/20 border-purple-400/30",
    tron: "from-red-500/20 to-orange-500/20 border-red-400/30",
  };

  const chainLabels = {
    ethereum: "Ethereum",
    solana: "Solana",
    tron: "Tron",
  };

  const chainBadgeColors = {
    ethereum: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    solana: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    tron: "bg-red-500/20 text-red-300 border-red-400/30",
  };

  const ChainIcon = {
    ethereum: Coins,
    solana: Sparkles,
    tron: Zap,
  }[chain];

  return (
    <div
      onClick={onClick}
      className={twMerge(
        "relative p-4 rounded-2xl",
        "bg-gradient-to-br",
        chainColors[chain],
        "backdrop-blur-xl",
        "border border-white/20",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
        onClick && "cursor-pointer hover:border-white/40 transition-all duration-300"
      )}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/5 via-transparent to-transparent opacity-0 pointer-events-none" />
      
      {/* Chain Badge */}
      <div className={twMerge(
        "absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold border backdrop-blur-sm",
        chainBadgeColors[chain]
      )}>
        {chainLabels[chain]}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <ChainIcon className="w-6 h-6 text-white/80 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {token.name}
            </h3>
            <p className="text-sm text-white/70">
              {token.symbol}
            </p>
          </div>
        </div>

        {token.error ? (
          <div className="text-sm text-red-400 font-medium">
            {token.error}
          </div>
        ) : (
          <>
            <div className="text-xl font-bold text-lime-400 mb-2">
              {formatTokenBalance(token.balance)}
            </div>
            {token.mint && (
              <div className="text-xs text-white/50 break-all font-mono">
                {token.mint.slice(0, 20)}...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

